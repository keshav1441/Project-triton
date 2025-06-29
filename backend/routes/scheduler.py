from fastapi import APIRouter
from huggingface_hub import hf_hub_download
import joblib
import pandas as pd
from models.schedulerModel import WeatherInput, MODEL_FEATURES

REPO_ID = "lostinthesky/scheduler"

model_path = hf_hub_download(repo_id=REPO_ID, filename="retrained_model.pkl")

model = joblib.load(model_path)
feature_list = MODEL_FEATURES

router = APIRouter()

@router.post("/predict")
def predict_rain(data: WeatherInput):
    input_df = pd.DataFrame([data.dict()])
    input_df = input_df[feature_list]

    prediction = model.predict(input_df)[0]
    confidence = model.predict_proba(input_df)[0][1]

    return {
        "predicted_rain": bool(prediction),
        "confidence": round(confidence, 3)
    }
