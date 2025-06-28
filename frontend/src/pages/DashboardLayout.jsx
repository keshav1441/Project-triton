import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { signOut } from 'aws-amplify/auth'

export default function DashboardLayout() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/get-started')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-60 h-screen bg-gray-900 text-white p-4 fixed flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Triton Dashboard</h2>
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-cyan-300">Dashboard</Link>
            <Link to="/analytics" className="hover:text-cyan-300">Analytics</Link>
          </nav>
        </div>

        <button
          onClick={handleSignOut}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      <main className="ml-60 p-6 w-full min-h-screen bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}