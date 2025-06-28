import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/get-started');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { to: '/', label: 'Dashboard', icon: HomeOutlinedIcon },
    { to: '/analytics', label: 'Analytics', icon: AutoGraphOutlinedIcon },
    { to: '/scan', label: 'Scan', icon: CameraAltOutlinedIcon },
    { to: '/connect', label: 'Connect', icon: ChatOutlinedIcon },
    { to: '/leaderboard', label: 'Leaderboard', icon: LeaderboardOutlinedIcon },
    { to: '/smarttriton', label: 'SmartTriton', icon: AccountCircleOutlinedIcon },
    { to: '/scheduler', label: 'Scheduler', icon: CalendarMonthOutlinedIcon },
  ];

  const SidebarContent = () => (
    <div className="h-full bg-gray-900 text-white p-5 flex flex-col justify-between w-60">
      <div>
        {/* Logo + Text */}
        <div className="flex items-center space-x-4 mb-6 group">
          <div className="bg-blue-500 text-black rounded w-10 h-10 flex items-center justify-center font-bold group-hover:text-white transition-colors duration-200">
            T
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-center">Project Triton</h2>
            <span className="text-sm text-gray-300 text-center">Beach Conservation</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center space-x-2 px-2 py-1 rounded ${
                location.pathname === to ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Icon
                className={`flex-1 transition-colors duration-200 ${
                  location.pathname === to ? 'text-white' : 'text-blue-500 group-hover:text-white'
                }`}
              />
              <span className="flex-2">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleSignOut}
        className="mt-6 outline hover:bg-blue-600 hover:outline-transparent outline-offset-2 outline-white text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between p-4 z-20">
        <h1 className="text-lg font-bold">Triton</h1>
        <button onClick={() => setSidebarOpen(true)} className="text-white text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden md:flex fixed flex-col h-screen w-60">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)}>
          <div
            className="bg-gray-900 text-white w-60 h-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1  md:ml-60 xs:mt-60   w-full">
        <Outlet />
      </main>
    </div>
  );
}
