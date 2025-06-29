from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime, date
from bson import ObjectId

class WeatherInput(BaseModel):
    name: str
    datetime: datetime
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
    preciptype: Optional[List[str]] = None
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
    sunrise: Optional[str] = None
    sunset: Optional[str] = None
    moonphase: float
    conditions: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    stations: Optional[List[str]] = None


    
MODEL_FEATURES = [
    'tempmax', 'tempmin', 'temp', 'feelslikemax', 'feelslikemin', 'feelslike',
    'dew', 'humidity', 'precip', 'precipprob', 'precipcover', 'snow',
    'snowdepth', 'windgust', 'windspeed', 'winddir', 'sealevelpressure',
    'cloudcover', 'visibility', 'solarradiation', 'solarenergy', 'uvindex',
    'severerisk', 'moonphase'
]

class Schedule(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    task: str
    start_time: datetime
    end_time: datetime  
    date: date
    location: str
    created_by: ObjectId