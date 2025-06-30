from fastapi import APIRouter, HTTPException
from db import event_collection
from datetime import datetime
from bson import ObjectId
from typing import Any

router = APIRouter()

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

@router.get("/connect/events")
async def get_sorted_scheduled_events():
    try:
        # Find all events that have a date field, sorted by date ascending
        cursor = event_collection.find({"date": {"$exists": True}}).sort("date", 1)
        scheduled_events = await cursor.to_list(length=None)

        # Convert ObjectId fields to strings for JSON serialization
        scheduled_events = convert_objectid_to_str(scheduled_events)

        return {
            "message": "All Scheduled Events (sorted by date)",
            "data": scheduled_events
        }

    except Exception as e:
        print(f"Error while fetching sorted events: {e}")
        raise HTTPException(status_code=500, detail=f"Error retrieving sorted schedule: {e}")
