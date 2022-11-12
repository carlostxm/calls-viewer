import React from 'react';
import { login as callsLogin } from './api';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { User } from 'model';

function App() {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (user: string, password: string) =>
    callsLogin(user, password).then((u) => {
      setUser(u);
    });

  return user ? (
    <AuthenticatedApp user={user} />
  ) : (
    <UnauthenticatedApp login={login} />
  );
}

export default App;
