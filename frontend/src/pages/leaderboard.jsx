import React, { useState, useEffect } from 'react';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const LeaderBoard = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const leaderboard = [
    { name: 'Aditi Kala', score: 120 },
    { name: 'Keshav', score: 110 },
    { name: 'Ananya', score: 100 },
    { name: 'Rohit', score: 95 },
    { name: 'Meera', score: 90 },
  ];

  const currentUser = {
    name: 'Keshav',
    rank: 2,
    score: 110,
  };

  return (
    <div className="flex flex-col min-h-screen p-4 gap-6 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-white h-20 p-4 rounded-xl shadow-lg">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">🏅 Leaderboard</h1>
          <p className="text-sm text-gray-600">Celebrate the top performers of your beach conservation community.</p>
        </div>
        <button className="flex items-center gap-2 text-sm text-white bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 shadow-md">
          <ShareOutlinedIcon style={{ fontSize: 18 }} /> Share
        </button>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-8 mt-4">
        {[1, 0, 2].map((i, idx) => {
          const user = leaderboard[i];
          const heights = ['h-32', 'h-40', 'h-28'];
          const scale = ['scale-100', 'scale-110', 'scale-95'];
          return (
            <div key={idx} className={`flex flex-col items-center ${scale[idx]}`}>
              <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold shadow-lg border-2 border-white">
                {user.name[0]}
              </div>
              <div className="text-sm font-semibold text-gray-800 mt-2">{user.name}</div>
              <div
                className={`bg-blue-200 ${heights[idx]} w-16 mt-3 rounded-t-xl flex items-center justify-center text-sm font-bold text-blue-900 shadow-md`}
              >
                #{i + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* Top 10 List */}
      <div className="bg-white mt-6 p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Top 10 Contributors</h2>
        <div className="space-y-3">
          {leaderboard.map((user, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl flex items-center justify-between transition duration-200 ${
                currentUser.name === user.name
                  ? 'bg-blue-100 border border-blue-300 shadow-inner'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow">
                  {user.name[0]}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">Rank #{idx + 1}</div>
                </div>
              </div>
              <div className="text-lg font-bold text-blue-700">{user.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User Rank */}
      <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 mt-6 p-5 rounded-2xl shadow text-center">
        <h3 className="text-xl font-semibold text-blue-800 mb-1">🎯 Your Stats</h3>
        <p className="text-gray-700 text-sm">
          You are currently ranked <span className="font-bold text-blue-900">#{currentUser.rank}</span> with a score of{' '}
          <span className="font-bold text-blue-900">{currentUser.score}</span>. Keep going strong!
        </p>
      </div>
    </div>
  );
};

export default LeaderBoard;
