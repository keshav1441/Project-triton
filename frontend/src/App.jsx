import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Analytics from './pages/analytics'
import GetStarted from './pages/GetStarted'
import RequireAuth from './pages/RequireAuth'
import DashboardLayout from './pages/DashboardLayout'

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
        </Route>
      </Routes>
    </Router>
  )
}

export default App
