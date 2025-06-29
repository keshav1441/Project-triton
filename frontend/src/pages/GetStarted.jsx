import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, signOut as amplifySignOut } from 'aws-amplify/auth';
import awsExports from '../aws-exports';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

Amplify.configure(awsExports);

export default function GetStarted() {
  const navigate = useNavigate();
  const hasSync = useRef(false);

  const syncUserWithBackend = async () => {
    if (hasSync.current) return;
    hasSync.current = true;

    try {
      const session = await fetchAuthSession();
      const idToken = session.tokens?.idToken?.toString();

      if (idToken) {
        await fetch('http://localhost:8000/api/user', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });
      }

      setTimeout(() => navigate('/'), 0);
    } catch (err) {
      console.error('Error syncing user:', err);
      setTimeout(() => navigate('/'), 0);
    }
  };

  const handleSignOut = async () => {
    try {
      await amplifySignOut(); 
      navigate('/');
    } catch (err) {
      console.error('Error during sign out:', err);
    }
  };

  return (
    <div className="auth flex justify-center items-center h-screen">
      <Authenticator>
        {({ user }) => {
          if (user) {
            syncUserWithBackend();
            return (
              <main>
                <h1>Hello {user.username}</h1>
                <button onClick={handleSignOut}>Sign out</button>
              </main>
            );
          }

          return null;
        }}
      </Authenticator>
    </div>
  );
}
