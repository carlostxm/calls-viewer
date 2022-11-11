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

async function login(username: string, password: string): Promise<string> {
  return client<LoginResponse>('auth/login', {
    data: { username, password },
  }).then((userData) => userData.user.username);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { login, logout };
