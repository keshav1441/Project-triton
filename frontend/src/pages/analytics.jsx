import React, { useEffect, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
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
      label: 'Waste Collected',
    },
    {
      icon: <PeopleOutlineOutlinedIcon fontSize="large" className="text-yellow-400" />,
      percentage: '+8%',
      value: '310',
      label: 'Volunteers Joined',
    },
    {
      icon: <EnergySavingsLeafOutlinedIcon fontSize="large" className="text-green-400" />,
      percentage: '+5%',
      value: '1.2KWh',
      label: 'Energy Saved',
    },
    {
      icon: <AddLocationAltOutlinedIcon fontSize="large" className="text-red-400" />,
      percentage: '+3%',
      value: '18',
      label: 'Clean Zones',
    },
  ];

  const wasteMonthlyData = [
    { month: 'March', waste: 3.2 },
    { month: 'April', waste: 5.1 },
    { month: 'May', waste: 6.8 },
    { month: 'June', waste: 8.9 },
  ];

  const zoneWiseData = [
    { zone: 'Juhu', waste: 6.2 },
    { zone: 'Versova', waste: 5.1 },
    { zone: 'Carter Rd', waste: 4.0 },
    { zone: 'Marine Dr', waste: 3.3 },
  ];

  const wasteSplitData = [
    { name: 'Plastic', value: 45 },
    { name: 'Metal', value: 20 },
    { name: 'Organic', value: 25 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#60A5FA', '#F87171', '#34D399', '#A78BFA'];

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white h-20 p-4 rounded shadow">
        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-bold">Analytics</h1>
          <p className="text-gray-600">Visual insights into beach cleanup performance.</p>
        </div>
        <div className="flex flex-col items-center text-black font-light text-3xl font-roboto">
          <div>{time}</div>
          <div className="text-base text-gray-600">Monthly Metrics</div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        {/* Left Section */}
        <div className="md:w-2/3 bg-white p-4 rounded shadow flex flex-col gap-6">
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

          {/* Line Chart - Waste Over Time */}
          <div className="bg-white p-4 border border-blue-100 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2 text-blue-900">
              📈 Monthly Waste Collected (in Tons)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={wasteMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 'auto']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="waste" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Section - Pie Chart + Summary */}
        <div className="md:w-1/3 bg-white p-4 rounded shadow border border-gray-100 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-purple-900">🍃 Waste Composition</h2>
<ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={wasteSplitData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={90}
      fill="#8884d8"
      label={({ name, percent }) =>
        `${name} (${(percent * 100).toFixed(0)}%)`
      }
    >
      {wasteSplitData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip
      formatter={(value, name) => [`${value}%`, name]}
    />
    <Legend verticalAlign="bottom" height={36} />
  </PieChart>
</ResponsiveContainer>


          {/* Summary Card */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 shadow-inner">
            <h3 className="text-md font-bold text-blue-900 mb-1">🌏 Environmental Impact</h3>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Reduced plastic usage by <strong>18%</strong></li>
              <li>Saved approx. <strong>4.2KWh</strong> energy from recycling</li>
              <li>Prevented <strong>2T</strong> of CO₂ emissions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Full Width Zone-wise Chart */}
      <div className="bg-white p-4 rounded shadow border border-gray-200 mt-4">
        <h2 className="text-lg font-semibold mb-2 text-green-800">📍 Zone-wise Waste Contribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={zoneWiseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="zone" />
            <YAxis domain={[0, 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="waste" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
