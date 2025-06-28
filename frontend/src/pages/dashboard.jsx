import React, { useState, useEffect } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

const Dashboard = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: <DeleteOutlineOutlinedIcon fontSize="large" className="text-gray-400" />,
      percentage: '+12%',
      value: '24T',
      label: 'Waste Collected'
    },
    {
      icon: <PeopleOutlineOutlinedIcon fontSize="large" className="text-yellow-400" />,
      percentage: '+8%',
      value: '310',
      label: 'Volunteers Joined'
    },
    {
      icon: <EnergySavingsLeafOutlinedIcon fontSize="large" className="text-green-400" />,
      percentage: '+5%',
      value: '1.2KWh',
      label: 'Energy Saved'
    },
    {
      icon: <AddLocationAltOutlinedIcon fontSize="large" className="text-red-400" />,
      percentage: '+3%',
      value: '18',
      label: 'Clean Zones'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white h-20 p-4 rounded shadow">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what’s happening to Mumbai's Beaches.</p>
        </div>
        <div className="flex flex-col items-center text-black font-light text-3xl font-roboto">
          <div>{time}</div>
          <div className="text-base text-gray-600">Mumbai Beaches</div>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow">

        {/* Left Section */}
        <div className="md:w-2/3 bg-white p-4 rounded shadow flex flex-col gap-4">

          {/* Stat Cards */}
          <div className="flex flex-wrap justify-between gap-2">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="w-[160px] h-[120px] bg-white p-4 rounded-xl shadow border border-gray-200 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <div>{stat.icon}</div>
                  <div className="text-green-400 text-sm font-medium">{stat.percentage}</div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="flex flex-col gap-2 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-1">Upcoming Events</h2>
            <ul className="flex flex-col gap-2">
              {[
                {
                  icon: "🌊",
                  name: "Beach Cleanup",
                  location: "Juhu",
                  date: "July 5",
                  volunteers: 34,
                  status: "Filling Fast",
                  color: "bg-yellow-300",
                },
                {
                  icon: "♻️",
                  name: "Plastic Audit",
                  location: "Versova",
                  date: "July 10",
                  volunteers: 21,
                  status: "Open",
                  color: "bg-green-300",
                },
                {
                  icon: "👥",
                  name: "Volunteer Meetup",
                  location: "Carter Road",
                  date: "July 15",
                  volunteers: 18,
                  status: "Fully Booked",
                  color: "bg-red-300",
                },
                {
                  icon: "🧼",
                  name: "Awareness Drive",
                  location: "Marine Drive",
                  date: "July 20",
                  volunteers: 27,
                  status: "Few Slots",
                  color: "bg-orange-300",
                },
              ].map((event, index) => (
                <li
                  key={index}
                  className="bg-white p-2 rounded border border-gray-200 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{`${event.icon} ${event.name}`}</span>
                      <span
                        className={`text-xs text- px-2 py-0.5 rounded-full ${event.color}`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      📍 {event.location} &nbsp; | 🗓️ {event.date} &nbsp; | 👥 {event.volunteers} volunteers
                    </div>
                  </div>
                  <button
                    disabled={event.status === "Fully Booked"}
                    className={`text-xs w-20 px-3 py-1 rounded transition duration-200 ${
                      event.status === "Fully Booked"
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-400 text-white hover:bg-blue-500"
                    }`}
                  >
                    {event.status === "Fully Booked" ? "Full" : "Join"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Current Beach Status</h2>
          {[
            {
              name: "Juhu Beach",
              volunteers: "High",
              waste: "12.4 kg",
              status: "Excellent",
              color: "bg-green-300",
            },
            {
              name: "Versova Beach",
              volunteers: "Medium",
              waste: "23.1 kg",
              status: "Needs Attention",
              color: "bg-yellow-300",
            },
            {
              name: "Carter Road",
              volunteers: "Low",
              waste: "35.6 kg",
              status: "Critical",
              color: "bg-red-300",
            },
            {
              name: "Marine Drive",
              volunteers: "Medium",
              waste: "18.7 kg",
              status: "Good",
              color: "bg-blue-300",
            },
          ].map((beach, index) => (
            <div
              key={index}
              className="bg-white p-3 mb-3 rounded shadow border border-gray-200"
            >
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold">{beach.name}</h3>
                <span
                  className={`text-xs text- px-2 py-0.5 rounded-full ${beach.color}`}
                >
                  {beach.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                👥 Volunteers: <span className="font-medium">{beach.volunteers}</span>
              </div>
              <div className="text-sm text-gray-600">
                🗑️ Waste: <span className="font-medium">{beach.waste}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
