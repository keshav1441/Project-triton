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
  const beaches = ['Juhu', 'Versova', 'Carter Road', 'Marine Drive'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSchedule = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    if (!scheduledDates.includes(dateStr)) {
      setScheduledDates([...scheduledDates, dateStr]);
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
      {/* Triton Scheduler Header - unchanged */}
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
          <div className="grid grid-cols-7 gap-2 text-xs">
            {generateCurrentMonthDates().map((date, idx) => {
              const dateStr = date.toISOString().split('T')[0];
              const isScheduled = scheduledDates.includes(dateStr);
              const isSelected = selectedDate.toDateString() === date.toDateString();

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={`w-full h-10 rounded 
                    ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} 
                    ${isScheduled ? 'border border-green-500' : ''}
                    hover:bg-blue-400 hover:text-white`}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Schedule Event Section */}
          <div className="mt-4 flex  gap-6 text-sm">
            <div className="text-gray-700 flex justify-center items-center h-10">
  Selected: {selectedDate.toDateString()}
</div>

            <select
              className="border rounded px-2 py-1"
              value={selectedBeach}
              onChange={(e) => setSelectedBeach(e.target.value)}
            >
              <option value="">Select Beach</option>
              {beaches.map((beach, i) => (
                <option key={i} value={beach}>{beach}</option>
              ))}
            </select>
            <button
              onClick={handleSchedule}
              disabled={!selectedBeach}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Schedule Event
            </button>
            <button
              disabled={!selectedBeach}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
            >
              Get Prediction
            </button>
          </div>
        </div>

        {/* Weather & Tide Section */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow-sm flex flex-col gap-4 text-sm">
          <h2 className="text-lg font-semibold">Beach Weather & Tide</h2>
          {[{ beach: 'Juhu', weather: 'Sunny', tide: 'High' },
            { beach: 'Versova', weather: 'Cloudy', tide: 'Low' },
            { beach: 'Carter Road', weather: 'Rainy', tide: 'High' },
            { beach: 'Marine Drive', weather: 'Clear', tide: 'Medium' },
          ].map((info, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded">
              <h3 className="font-medium text-gray-700">{info.beach}</h3>
              <p className="text-xs text-gray-600">☀️ Weather: {info.weather}</p>
              <p className="text-xs text-gray-600">🌊 Tide: {info.tide}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
