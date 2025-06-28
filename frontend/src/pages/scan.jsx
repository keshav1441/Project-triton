import React, { useState, useEffect, useRef } from 'react';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';

const Scan = () => {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const fileInputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scannedItems = [
    { label: 'Plastic', count: 14, icon: <RecyclingOutlinedIcon className="text-blue-500" /> },
    { label: 'Organic', count: 7, icon: <EmojiNatureOutlinedIcon className="text-green-500" /> },
    { label: 'Metal', count: 3, icon: <DeleteOutlineOutlinedIcon className="text-red-500" /> },
    { label: 'Other', count: 5, icon: <AllInclusiveOutlinedIcon className="text-gray-500" /> },
  ];

  const handleCameraOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      alert(`Selected: ${file.name}`);
      // You can add image preview or processing here
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-4 gap-4 bg-gray-50">

      {/* Header */}
      <div className="flex justify-between items-center bg-white h-20 p-4 rounded shadow">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-900">AI Waste Scanner</h1>
          <p className="text-sm text-gray-600">Identify waste by uploading or scanning an image.</p>
        </div>
        <div className="flex flex-col items-center font-light text-gray-800">
          <div className="text-2xl">{time}</div>
          <div className="text-xs text-gray-500">Live Detection</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 flex-grow">

        {/* Left - Camera Upload Section */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow relative flex flex-col justify-center items-center text-center">
          <div className="absolute top-4 left-4 text-xs font-medium text-blue-600 tracking-wide uppercase">Live Mode</div>
          <CameraAltTwoToneIcon className="text-gray-300" style={{ fontSize: 100 }} />
          <p className="text-sm text-gray-600 mt-4">
            Tap below to open your camera or upload a photo of waste.
          </p>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleCameraOpen}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Upload Image
          </button>
        </div>

        {/* Right - Scanned Waste Summary */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Scanned Waste Summary</h2>
          <div className="grid grid-cols-2 gap-3">
            {scannedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 text-base">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <div className="text-lg font-bold text-gray-800">{item.count}</div>
              </div>
            ))}
          </div>

          {/* Impact Badge */}
          <div className="mt-6 bg-blue-500 text-white p-4 rounded-xl text-center shadow-md">
            <h3 className="text-lg font-semibold mb-1">👏 Great Impact</h3>
            <p className="text-sm font-light">You’ve contributed to cleaning <span className="font-medium">3 km</span> of coastline!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
