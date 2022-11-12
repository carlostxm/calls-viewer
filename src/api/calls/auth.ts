import { User } from 'model';
import { client } from './api-client';

const localStorageKey = '__auth_provider_token__';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

function handleLoginResponse(userData: LoginResponse): User {
  const { access_token: token, user } = userData;
  window.localStorage.setItem(localStorageKey, token);
  return { name: user.username, token };
}

async function login(username: string, password: string): Promise<User> {
  return client<LoginResponse>('auth/login', {
    data: { username, password },
  }).then(handleLoginResponse);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { login, logout };
