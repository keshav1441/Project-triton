from pydantic import BaseModel, ConfigDict
from typing import List
from bson import ObjectId
from datetime import datetime, date

class WeatherInput(BaseModel):
    tempmax: float
    tempmin: float
    temp: float
    feelslikemax: float
    feelslikemin: float
    feelslike: float
    dew: float
    humidity: float
    precip: float
    precipprob: float
    precipcover: float
    snow: float
    snowdepth: float
    windgust: float
    windspeed: float
    winddir: float
    sealevelpressure: float
    cloudcover: float
    visibility: float
    solarradiation: float
    solarenergy: float
    uvindex: float
    severerisk: float
    moonphase: float
    
MODEL_FEATURES: List[str] = [
    "temp", "humidity", "windspeed", "pressure", "visibility", "cloudcover", "uvindex", "tempmax",
    "tempmin", "feelslike", "dew", "precip", "precipprob", "precipcover", "snow", "snowdepth",
    "windgust", "winddir", "sealevelpressure", "solarradiation", "solarenergy", "severerisk", "moonphase"
]

class Schedule(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    task: str
    start_time: datetime
    end_time: datetime  
    date: date
    location: str
    created_by: ObjectId