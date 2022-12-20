import { client } from 'api/client';
import {
  AUTH_PROVIDER_ACCESS_TOKEN_KEY,
  AUTH_PROVIDER_REFRESH_TOKEN_KEY,
} from './config';

interface RefreshAccessTokenResponse {
  access_token: string;
  refresh_token: string;
}

async function refreshAccessToken() {
  const refreshToken = await localStorage.getItem(
    AUTH_PROVIDER_REFRESH_TOKEN_KEY
  );
  return client<RefreshAccessTokenResponse>('auth/refresh-token-v2', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  }).then(({ access_token }: RefreshAccessTokenResponse) => {
    console.log('refresh-token', access_token);
    window.localStorage.setItem(AUTH_PROVIDER_ACCESS_TOKEN_KEY, access_token);
  });
}

export default refreshAccessToken;
