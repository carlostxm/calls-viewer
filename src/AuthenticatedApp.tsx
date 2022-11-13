import { useAuth } from 'hooks/useAuth';
import { Routes, Route } from 'react-router-dom';
import { CallsViewer, CallDetails } from 'screens';

function AuthenticatedApp() {
  const {
    state: { user },
  } = useAuth();

  if (!user) {
    throw new Error(
      '<AuthenticatedApp/> cannot be displayed if user is missing'
    );
  }

  return (
    <>
      <CallsViewer user={user} />
      <Routes>
        <Route path='/' element={<CallsViewer user={user} />} />
        <Route path='/details' element={<CallDetails />} />
      </Routes>
    </>
  );
}

export default AuthenticatedApp;
