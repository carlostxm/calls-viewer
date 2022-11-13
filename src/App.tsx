import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { AuthProvider } from 'context/auth';

function App() {
  const {
    state: { user },
  } = useAuth();

  console.log('App rendered', user);

  return user ? (
    <Router>
      <AuthenticatedApp />
    </Router>
  ) : (
    <UnauthenticatedApp />
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
