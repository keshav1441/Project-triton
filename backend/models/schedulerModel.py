from pydantic import BaseModel
from typing import List

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
    "temp", "humidity", "windspeed", "pressure", "visibility", "cloudcover", "uvindex"
]