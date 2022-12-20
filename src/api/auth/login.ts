import { client } from 'api/client';
import { AuthResponse } from 'api/model';
import { User } from 'model';
import {
  AUTH_PROVIDER_ACCESS_TOKEN_KEY,
  AUTH_PROVIDER_REFRESH_TOKEN_KEY,
} from './config';

export function handleLoginResponse(userData: AuthResponse): User {
  const { access_token, refresh_token, user } = userData;
  window.localStorage.setItem(AUTH_PROVIDER_ACCESS_TOKEN_KEY, access_token);
  window.localStorage.setItem(AUTH_PROVIDER_REFRESH_TOKEN_KEY, refresh_token);
  return {
    name: user.username,
    accessToken: access_token,
    refreshToken: refresh_token,
  };
}

async function login(username: string, password: string): Promise<User> {
  return client<AuthResponse>('auth/login', {
    data: { username, password },
  }).then(handleLoginResponse);
}

export default login;
