// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Analytics from './pages/analytics'

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 h-screen bg-gray-900 text-white p-4 fixed">
          <h2 className="text-xl font-bold mb-6">Triton Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-cyan-300">Dashboard</Link>
            <Link to="/analytics" className="hover:text-cyan-300">Analytics</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-60 p-6 w-full min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
