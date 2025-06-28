import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Analytics from './pages/analytics'
import Scan from './pages/scan'
import GetStarted from './pages/GetStarted'
import RequireAuth from './pages/RequireAuth'
import DashboardLayout from './pages/DashboardLayout'
import LeaderBoard from './pages/leaderboard'
import Connect from './pages/connect'
import Scheduler from './pages/scheduler'
import SmartTriton from './pages/smarttriton'
import Profile from './pages/profile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/get-started" element={<GetStarted />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="scan" element={<Scan />} />
          <Route path="leaderboard" element={<LeaderBoard />} />
          <Route path="connect" element={<Connect />} />
          <Route path="scheduler" element={<Scheduler />} />
          <Route path="smarttriton" element={<SmartTriton />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
