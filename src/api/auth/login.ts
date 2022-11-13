import { client } from 'api/client';
import { User } from 'model';
import { AUTH_PROVIDER_TOKEN_KEY } from './config';

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    username: string;
  };
}

function handleLoginResponse(userData: LoginResponse): User {
  const { access_token, refresh_token, user } = userData;
  window.localStorage.setItem(AUTH_PROVIDER_TOKEN_KEY, access_token);
  return {
    name: user.username,
    accessToken: access_token,
    refreshToken: refresh_token,
  };
}

async function login(username: string, password: string): Promise<User> {
  return client<LoginResponse>('auth/login', {
    data: { username, password },
  }).then(handleLoginResponse);
}

export default login;
