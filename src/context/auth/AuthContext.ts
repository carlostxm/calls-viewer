import { createContext } from 'react';
import { User } from 'model';

export interface AuthContextType {
  state: {
    user: User | null;
    status: 'loading' | 'auth' | 'no-auth';
    error: Error | null;
  };
  login: (user: string, password: string) => void;
}

export const INITIAL_AUTH_CONTEXT: AuthContextType = {
  state: { user: null, status: 'no-auth', error: null },
  login: () => Promise.resolve(null),
};

const AuthContext = createContext<AuthContextType>(INITIAL_AUTH_CONTEXT);
AuthContext.displayName = 'AuthContext';

export default AuthContext;
