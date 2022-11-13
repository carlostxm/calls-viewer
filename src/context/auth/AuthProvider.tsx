import { PropsWithChildren, useState } from 'react';
import { login as callsLogin } from 'api';
import AuthContext, {
  AuthContextType,
  INITIAL_AUTH_CONTEXT,
} from './AuthContext';

function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [state, setState] = useState<AuthContextType['state']>(
    INITIAL_AUTH_CONTEXT.state
  );

  const login = (user: string, password: string) => {
    setState({ user: null, status: 'loading', error: null });

    callsLogin(user, password)
      .then((u) => {
        setState({ status: 'auth', user: u, error: null });
        return u;
      })
      .catch((error) => {
        setState({ status: 'no-auth', user: null, error });
        throw error;
      });
  };

  const value = { state, login };

  if (state.status === 'loading') {
    return <h3>Loading...</h3>;
  } else if (state.error) {
    return <h3>Authentication error!</h3>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
