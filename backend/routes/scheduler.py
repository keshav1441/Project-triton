from fastapi import APIRouter, HTTPException, Depends
from utils.currentUser import get_current_user
from huggingface_hub import hf_hub_download
import joblib
import pandas as pd
from models.schedulerModel import WeatherInput, MODEL_FEATURES, ScheduleCreateModel
from db import event_collection
from datetime import datetime, date
from bson import ObjectId
from typing import Any

router = APIRouter()

# Load model from Hugging Face
try:
    REPO_ID = "lostinthesky/scheduler"
    model_path = hf_hub_download(repo_id=REPO_ID, filename="retrained_model.pkl")
    model = joblib.load(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load model from Hugging Face: {e}")

feature_list = MODEL_FEATURES

def convert_objectid_to_str(obj: Any) -> Any:
    """
    Recursively convert all ObjectId instances to strings in a nested structure
    """
    if isinstance(obj, ObjectId):
        return str(obj)
    elif isinstance(obj, dict):
        return {key: convert_objectid_to_str(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid_to_str(item) for item in obj]
    elif isinstance(obj, tuple):
        return tuple(convert_objectid_to_str(item) for item in obj)
    else:
        return obj

@router.post("/predict")
def predict_rain(data: WeatherInput):
    try:
        input_df = pd.DataFrame([data.dict()])

        # Clean list fields (preciptype, stations)
        if isinstance(data.preciptype, list):
            input_df["preciptype"] = [",".join(data.preciptype)]
        if isinstance(data.stations, list):
            input_df["stations"] = [",".join(data.stations)]

        # Filter only model input features and fill missing with 0
        X = input_df[MODEL_FEATURES].fillna(0)

        # Ensure column order matches what model was trained with
        X = X[MODEL_FEATURES]

        prediction = model.predict(X)[0]
        confidence = model.predict_proba(X)[0][1]

        return {
            "predicted_rain": bool(prediction),
            "confidence": round(confidence, 3)
        }
    except KeyError as e:
        raise HTTPException(status_code=400, detail=f"Missing feature(s): {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {e}")

@router.get("/schedule-all")
async def get_all_schedule_events(event_date: date):
    try:
        date_query = datetime.combine(event_date, datetime.min.time())
        
        # Get all events for the date
        cursor = event_collection.find({"date": date_query})
        scheduled_events = await cursor.to_list(length=None)
        
        # Convert all ObjectIds to strings
        scheduled_events = convert_objectid_to_str(scheduled_events)
        
        return {
            "message": "Scheduled Events",
            "data": scheduled_events
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving schedule: {e}")



@router.post("/schedule")
async def create_schedule(
    schedule_data: ScheduleCreateModel,
    user: dict = Depends(get_current_user)
):
    try:
        print(f"User object type: {type(user)}")
        print(f"User object: {user}")
        
        schedule_dict = schedule_data.dict()
        
        schedule_dict["created_by"] = ObjectId(user["_id"])

        if isinstance(schedule_dict["date"], date):
            schedule_dict["date"] = datetime.combine(schedule_dict["date"], datetime.min.time())

        result = await event_collection.insert_one(schedule_dict)
        
        schedule_dict["_id"] = str(result.inserted_id)
        schedule_dict["created_by"] = str(schedule_dict["created_by"])  

        return {
            "message": "Schedule created successfully",
            "data": schedule_dict
        }
        
    except Exception as e:
        print(f"Full error: {e}") 
        raise HTTPException(status_code=500, detail=f"Error creating schedule: {e}")