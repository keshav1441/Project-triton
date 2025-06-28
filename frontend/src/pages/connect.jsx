import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const Connect = () => {
  const upcomingEvents = [
    { name: 'Juhu Cleanup Drive', date: '2025-07-06', time: '9:00 AM', location: 'Juhu Beach' },
    { name: 'Versova Eco March', date: '2025-07-13', time: '8:30 AM', location: 'Versova Beach' },
    { name: 'Marine Drive Swachhta', date: '2025-07-20', time: '7:45 AM', location: 'Marine Drive' },
  ];

  const localGroups = [
    { name: 'Beach Buddies Mumbai', members: 128, focus: 'Plastic Removal' },
    { name: 'Marine Savers', members: 84, focus: 'Ocean Health Awareness' },
    { name: 'Green Versova', members: 92, focus: 'Community Cleanups' },
    { name: 'Carter Protectors', members: 66, focus: 'Weekly Drive Events' },
  ];

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white h-20 p-4 rounded-xl shadow">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">🌍 Community Connect</h1>
          <p className="text-sm text-gray-600">Join events and connect with local cleanup groups.</p>
        </div>
        <button className="flex items-center gap-1 text-sm text-blue-600 border border-blue-100 px-3 py-1 rounded hover:bg-blue-50">
          <ShareOutlinedIcon style={{ fontSize: 18 }} /> Share
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        {/* Events Section */}
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-md border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">📅 Upcoming Beach Events</h2>
          <div className="space-y-5">
            {upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="bg-blue-50 hover:bg-blue-100 transition p-4 rounded-xl border border-blue-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-blue-700">{event.name}</h3>
                <p className="text-sm text-gray-700 mt-1">🗓 {event.date} | ⏰ {event.time}</p>
                <p className="text-sm text-gray-600">📍 {event.location}</p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-700 transition">
                  Join Event
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp Groups Section */}
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-md border border-green-100">
          <h2 className="text-xl font-semibold text-green-900 mb-4">🤝 Join WhatsApp Groups</h2>
          <div className="space-y-5">
            {localGroups.map((group, idx) => (
              <div
                key={idx}
                className="bg-green-50 hover:bg-green-100 transition p-4 rounded-xl border border-green-200 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-green-700">{group.name}</h3>
                <p className="text-sm text-gray-700 mt-1">👥 {group.members} members</p>
                <p className="text-sm text-gray-600">🎯 Focus: {group.focus}</p>
                <button className="mt-3 flex items-center gap-2 bg-green-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-green-700 transition">
                  <WhatsAppIcon style={{ fontSize: '18px' }} />
                  Join WhatsApp Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;
