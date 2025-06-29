from fastapi import APIRouter, HTTPException
from huggingface_hub import hf_hub_download
import joblib
import pandas as pd
from models.schedulerModel import WeatherInput, MODEL_FEATURES

router = APIRouter()

# Load model from Hugging Face
try:
    REPO_ID = "lostinthesky/scheduler"
    model_path = hf_hub_download(repo_id=REPO_ID, filename="retrained_model.pkl")
    model = joblib.load(model_path)
except Exception as e:
    raise RuntimeError(f"Failed to load model from Hugging Face: {e}")

feature_list = MODEL_FEATURES

@router.get("/predict")
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


@router.get("/schedule")
def get_schedule():
    # Placeholder for schedule retrieval
    return {"message": "Schedule retrieved successfully"}

@router.post("/schedule")
def create_schedule(schedule_data: dict):
    # Placeholder for schedule creation
    return {"message": "Schedule created successfully", "data": schedule_data}
