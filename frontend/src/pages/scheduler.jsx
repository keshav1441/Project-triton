// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

const Scheduler = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledDates, setScheduledDates] = useState(["2025-07-05", "2025-07-10", "2025-07-20"]);
  const [selectedBeach, setSelectedBeach] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [eventDuration, setEventDuration] = useState('');

  const beaches = ['Juhu', 'Versova', 'Carter Road', 'Marine Drive'];
  

  // Weather API configuration
  const WEATHER_API_KEY = 'A7VT563ZR2PDFNDA8VVFDRQKC';
  const WEATHER_BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const mockWeatherData = {
      days: [
        {
          datetime: selectedDate.toISOString().split('T')[0],
          tempmax: Math.floor(Math.random() * 5) + 30,      // 30–34
          tempmin: Math.floor(Math.random() * 5) + 20,      // 20–24
          temp: Math.floor(Math.random() * 5) + 27,         // 27–31
          feelslikemax: 33.3,
          feelslikemin: 23.3,
          feelslike: 28.2,
          dew: 19.1,
          humidity: Math.floor(Math.random() * 30) + 50,    // 50–79
          precip: 0.0,
          precipprob: 0,
          precipcover: 0.0,
          snow: 0,
          snowdepth: 0.0,
          windgust: 30.6,
          windspeed: Math.floor(Math.random() * 10) + 10,   // 10–19
          winddir: 352.2,
          sealevelpressure: 1013.5,
          cloudcover: Math.floor(Math.random() * 50),       // 0–49
          visibility: 2.7,
          solarradiation: 204.4,
          solarenergy: 17.6,
          uvindex: 7,
          severerisk: 10,
          sunrise: "2025-01-01T07:11:56",
          sunset: "2025-01-01T18:12:45",
          moonphase: 0.05,
          conditions: "Clear",
          description: "Clear conditions throughout the day.",
          icon: "clear-day",
          stations: ["VABB", "VAJJ"]
        }
      ]
    };

    setWeatherData(mockWeatherData);
  }, [selectedDate]);

  // Fetch weather data when date is selected
useEffect(() => {
  if (!weatherData || weatherData?.days?.[0]?.datetime !== selectedDate.toISOString().split('T')[0]) {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const url = `${WEATHER_BASE_URL}/mumbai/${dateStr}?unitGroup=us&key=${WEATHER_API_KEY}&contentType=json`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Weather API error: ${response.status}`);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }
}, [selectedDate]);



const handleSchedule = () => {
  const dateStr = selectedDate.toISOString().split('T')[0];
  const alreadyScheduled = scheduledDates.some(
    (event) => event.date === dateStr && event.beach === selectedBeach
  );
  if (!alreadyScheduled) {
    setScheduledDates([...scheduledDates, { date: dateStr, beach: selectedBeach }]);
  }
};


const handleGetPrediction = async () => {
  setPredictionLoading(true);
  try {
    const dayData = weatherData?.days?.[0];
    if (!dayData) {
      console.error('Missing daily weather data:', weatherData);
      setPredictionLoading(false);
      return;
    }

    const cleanedWeatherData = {
      name: "mumbai",
      datetime: selectedDate.toISOString(),
      tempmax: dayData.tempmax ?? 0,
      tempmin: dayData.tempmin ?? 0,
      temp: dayData.temp ?? 0,
      feelslikemax: dayData.feelslikemax ?? 0,
      feelslikemin: dayData.feelslikemin ?? 0,
      feelslike: dayData.feelslike ?? 0,
      dew: dayData.dew ?? 0,
      humidity: dayData.humidity ?? 0,
      precip: dayData.precip ?? 0,
      precipprob: dayData.precipprob ?? 0,
      precipcover: dayData.precipcover ?? 0,
      preciptype: dayData.preciptype ?? null,
      snow: dayData.snow ?? 0,
      snowdepth: dayData.snowdepth ?? 0,
      windgust: dayData.windgust ?? 0,
      windspeed: dayData.windspeed ?? 0,
      winddir: dayData.winddir ?? 0,
      sealevelpressure: dayData.sealevelpressure ?? 0,
      cloudcover: dayData.cloudcover ?? 0,
      visibility: dayData.visibility ?? 0,
      solarradiation: dayData.solarradiation ?? 0,
      solarenergy: dayData.solarenergy ?? 0,
      uvindex: dayData.uvindex ?? 0,
      severerisk: dayData.severerisk ?? 0,
      sunrise: dayData.sunrise ?? "",
      sunset: dayData.sunset ?? "",
      moonphase: dayData.moonphase ?? 0,
      conditions: dayData.conditions ?? "",
      description: dayData.description ?? "",
      icon: dayData.icon ?? "",
      stations: dayData.stations ?? []
    };

    const response = await fetch('http://localhost:8000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cleanedWeatherData)
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Prediction result:', result);
    setPrediction(result);
  } catch (error) {
    console.error('Error getting prediction:', error);
  } finally {
    setPredictionLoading(false);
  }
};




  const generateCurrentMonthDates = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(year, month, i));
    }
    return dates;
  };

  const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentMonthName = selectedDate.toLocaleString('default', { month: 'long' });
  const currentYear = selectedDate.getFullYear();

  return (
    <div className="flex flex-col min-h-screen p-4 gap-3 bg-gray-50 text-sm">
      {/* Triton Scheduler Header */}
      <div className="flex justify-between items-center bg-white h-20 p-4 rounded shadow">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-900">Triton Scheduler</h1>
          <p className="text-sm text-gray-600">Plan events and track beach activity efficiently.</p>
        </div>
        <div className="flex flex-col items-center font-light text-gray-800">
          <div className="text-2xl">{time}</div>
          <div className="text-xs text-gray-500">Live Detection</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Calendar Section */}
        <div className="md:w-2/3 bg-white p-4 rounded shadow-sm flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Event Calendar</h2>

          {/* Month-Year Heading */}
          <div className="text-center font-medium text-gray-700">
            {currentMonthName} {currentYear}
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center font-medium text-gray-600 text-xs">
            {weekdayNames.map((day, i) => (
              <div key={i} className="py-1">{day}</div>
            ))}
          </div>

          {/* Date Grid */}
          <div className="grid grid-cols-7 gap-2 text-xs ">
            {generateCurrentMonthDates().map((date, idx) => {
              const dateStr = date.toISOString().split('T')[0];
              const isScheduled = scheduledDates.includes(dateStr);
              const isSelected = selectedDate.toDateString() === date.toDateString();

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={`w-full h-15 rounded-lg 
                    ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} 
                    ${isScheduled ? 'border border-green-500' : ''}
                    hover:bg-blue-400 hover:text-white`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

        </div>

<div className="md:w-1/3 bg-white p-4 rounded shadow-sm flex flex-col gap-4 text-sm">
  <h2 className="text-lg font-semibold">Event Details</h2>

  <div className="flex flex-col gap-3">
        <div className="bg-blue-50 p-3 rounded">
      <h3 className="font-medium text-gray-800 mb-2">Weather Summary</h3>
      {weatherData?.days?.[0] ? (
        <div className="text-xs space-y-1">
          <div>🌡 Temp: {weatherData.days[0].temp}°F</div>
          <div>💧 Humidity: {weatherData.days[0].humidity}%</div>
          <div>🌬 Wind: {weatherData.days[0].windspeed} mph</div>
          <div>☁️ Condition: {weatherData.days[0].conditions}</div>
        </div>
      ) : (
        <div className="text-xs text-gray-500">No weather data available.</div>
      )}
    </div>
    {/* Selected Date Display */}
    <div  className="flex flex-col gap-3 px-4 ">
    <div className="text-sm text-gray-700 font-medium">
      📅 Selected Date: {selectedDate.toDateString()}
    </div>

    {/* Beach Selector */}
    <div>
      <label className="text-xs font-medium text-gray-700">Select Beach</label>
      <select
        className="w-full border rounded px-2 py-1 text-sm mt-1"
        value={selectedBeach}
        onChange={(e) => setSelectedBeach(e.target.value)}
      >
        <option value="">-- Choose Beach --</option>
        {beaches.map((beach, i) => (
          <option key={i} value={beach}>{beach}</option>
        ))}
      </select>
    </div>

    {/* Duration Selector */}
    <div>
      <label className="text-xs font-medium text-gray-700">Event Duration</label>
      <select
        className="w-full border rounded px-2 py-1 text-sm mt-1"
        value={eventDuration}
        onChange={(e) => setEventDuration(e.target.value)}
      >
        <option value="">-- Select Duration --</option>
        <option value="1">1 Hour</option>
        <option value="2">2 Hours</option>
        <option value="4">4 Hours</option>
      </select>
    </div>

    {/* Prediction Button */}
{/* Prediction Button */}
<button
  onClick={handleGetPrediction}
  disabled={!selectedBeach || !weatherData || predictionLoading || !eventDuration}
  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm disabled:bg-gray-400"
>
  {predictionLoading ? 'Getting Prediction...' : 'Get Prediction'}
</button>

{/* Show Volunteer Retention Score if prediction exists */}
{prediction && typeof prediction.confidence === 'number' && (
  <div className="text-xs mt-1 text-gray-700 text-center text">
    🧍‍♂️ <strong>Volunteer Retention:</strong> {100-(prediction.confidence * 100).toFixed(1)}%
  </div>
)}


    {/* Schedule Button or Message */}
    {scheduledDates.includes(selectedDate.toISOString().split('T')[0]) ? (
      <div className="text-xs bg-yellow-100 p-2 rounded text-yellow-800">
        📌 Event already scheduled on this date.
      </div>
    ) : (
      <button
        onClick={handleSchedule}
        disabled={!selectedBeach || !eventDuration}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm disabled:bg-gray-400"
      >
        Schedule Event
      </button>
    )}
  </div>

</div>
</div>


      </div>
      <div className="mt-4">
  <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
  {scheduledDates.length === 0 ? (
    <p className="text-sm text-gray-500">No upcoming events scheduled.</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {Array.from(
        scheduledDates.reduce((acc, { date, beach }) => {
          if (!acc.has(date)) acc.set(date, []);
          acc.get(date).push(beach);
          return acc;
        }, new Map())
      ).map(([date, beaches], idx) => (
        <div
          key={idx}
          className="border border-gray-200 p-3 rounded bg-white shadow-sm"
        >
          <div className="text-sm font-semibold text-gray-700 mb-2">
            📅 {new Date(date).toDateString()}
          </div>
          <ul className="text-sm space-y-1">
            {beaches.map((beach, bIdx) => (
              <li
                key={bIdx}
                className="flex justify-between items-center bg-blue-50 px-2 py-1 rounded"
              >
                {beach}
                <DeleteOutlineOutlinedIcon
                  className="text-red-500 cursor-pointer ml-2"
                  fontSize="small"
                  onClick={() =>
                    setScheduledDates(
                      scheduledDates.filter(
                        (e) => !(e.date === date && e.beach === beach)
                      )
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default Scheduler;