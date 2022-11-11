import React from 'react';

import { login as callsLogin } from './api';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const [user, setUser] = React.useState<string | null>(null);

  const login = (user: string, password: string) =>
    callsLogin(user, password).then((u) => {
      setUser(u);
    });

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp login={login} />;
}

export default App;
