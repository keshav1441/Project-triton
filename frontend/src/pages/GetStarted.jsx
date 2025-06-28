import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import awsExports from '../aws-exports';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

Amplify.configure(awsExports);

export default function GetStarted() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const syncUserWithBackend = async () => {
    console.log('Starting user sync...');
    setLoading(true);
    setError(null);
    
    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (!idToken) {
        throw new Error('No authentication token found');
      }

      console.log('Making API call to backend...');
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      console.log('User synced successfully:', userData);
      
      // Navigate to main app after successful sync
      setTimeout(() => {
        navigate('/');
      }, 0);
    } catch (err) {
      console.error('Error syncing user:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth flex justify-center items-center h-screen">
        <Authenticator>
          {({ signOut, user }) => {
            console.log('Current user:', user);
            
            if (user) {
              return (
                <main className="text-center p-6 bg-white rounded-lg shadow-md">
                  <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}!</h1>
                  
                  {loading && (
                    <div className="mb-4">
                      <p className="text-blue-600">Setting up your account...</p>
                    </div>
                  )}
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      <p>Error: {error}</p>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <button 
                      onClick={syncUserWithBackend}
                      disabled={loading}
                      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Setting up...' : 'Continue to App'}
                    </button>
                    
                    <div>
                      <button 
                        onClick={signOut}
                        className="text-gray-600 hover:text-gray-800 underline"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </main>
              );
            }

            // User not authenticated - show login form
            return null;
          }}
        </Authenticator>
      </div>
    </div>
  );
}