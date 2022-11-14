import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import { useAuth } from 'hooks/useAuth';
import { AuthProvider } from 'context/auth';

function App() {
  const {
    state: { user },
  } = useAuth();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;
