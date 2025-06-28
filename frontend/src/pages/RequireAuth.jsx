import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from 'aws-amplify/auth'

export default function RequireAuth({ children }) {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        setIsAuthenticated(false)
        navigate('/get-started')
      })
  }, [navigate])

  if (isAuthenticated === null) return <div>Loading...</div>

  return isAuthenticated ? children : null
}