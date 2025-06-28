import React from 'react';

const Profile = () => {
  const user = {
    name: 'Keshav Sharma',
    email: 'keshav@example.com',
    verified: true,
    joined: 'March 2024',
    badge: '🌿 Eco Hero',
    impact: {
      wasteCollected: '75kg',
      eventsAttended: 12,
      itemsScanned: 134,
    },
  };

  const achievements = [
    {
      title: 'Eco Warrior',
      subtitle: 'Collected 75kg of waste',
      details: 'Awarded for consistent participation in beach cleanups across 3 months.',
    },
    {
      title: 'Plastic Buster',
      subtitle: 'Eliminated 150 plastic items',
      details: 'Recognized for high plastic item detection and recycling through the scan tool.',
    },
  ];

  const challenges = [
    { title: 'Clean 100kg Waste', description: 'Join the elite cleanup league!', joined: false },
    { title: '10 Events in 2 Months', description: 'Earn the Event Marathon badge.', joined: true },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6 pt-2">
      
      {/* User Info + Badge/Impact Header */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">👤 Profile Info</h2>
          <div className="text-gray-700"><strong>Name:</strong> {user.name}</div>
          <div className="text-gray-700"><strong>Email:</strong> {user.email}</div>
          <div className="text-gray-700">
            <strong>Status:</strong>{' '}
            <span className={`font-semibold ${user.verified ? 'text-green-600' : 'text-red-500'}`}>
              {user.verified ? 'Verified ✅' : 'Not Verified ❌'}
            </span>
          </div>
          <div className="text-gray-700"><strong>Joined:</strong> {user.joined}</div>
        </div>

        {/* Badge & Impact */}
<div className="flex flex-col md:flex-row gap-4 md:w-1/2">
  {[
    { label: 'Waste Collected', value: user.impact.wasteCollected, color: 'bg-blue-100', textColor: 'text-blue-700' },
    { label: 'Events Attended', value: user.impact.eventsAttended, color: 'bg-green-100', textColor: 'text-green-700' },
    { label: 'Items Scanned', value: user.impact.itemsScanned, color: 'bg-yellow-100', textColor: 'text-yellow-700' },
  ].map((item, idx) => (
    <div
      key={idx}
      className={`flex-1 rounded-lg p-4 border shadow-sm ${item.color} ${item.textColor} text-center`}
    >
      <div className="text-lg font-semibold">{item.value}</div>
      <div className="text-sm">{item.label}</div>
    </div>
  ))}
</div>

      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">🏅 Achievements</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((ach, i) => (
            <div key={i} className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
              <h3 className="text-lg font-bold text-green-800">{ach.title}</h3>
              <p className="text-sm text-green-700 font-medium">{ach.subtitle}</p>
              <p className="text-xs text-gray-600 mt-2">{ach.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">🔥 Challenges</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {challenges.map((c, i) => (
            <div key={i} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-yellow-800">{c.title}</h3>
                <p className="text-sm text-yellow-700">{c.description}</p>
              </div>
              <button
                disabled={c.joined}
                className={`mt-4 px-4 py-2 rounded ${
                  c.joined
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-yellow-500 text-white hover:bg-yellow-600'
                }`}
              >
                {c.joined ? 'Already Joined' : 'Join Challenge'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
