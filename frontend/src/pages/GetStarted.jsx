import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { useNavigate } from 'react-router-dom';

Amplify.configure(awsExports);

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="auth flex justify-center items-center h-screen ">
        <Authenticator>
        {({ signOut, user }) => {
          if (user) {
            navigate('/');
            return null;
          }

          return (
            <main>
              <h1>Hello {user?.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          );
        }}
      </Authenticator>
      </div>
    </div>
  );
}
