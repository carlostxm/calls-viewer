import { User } from 'model';
import { Routes, Route } from 'react-router-dom';
import { CallsViewer, CallDetails } from 'screens';

interface AuthenticatedAppProps {
  user: User;
}

function AuthenticatedApp({ user }: AuthenticatedAppProps) {
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
