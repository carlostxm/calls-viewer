import { client } from 'api/client';

async function refreshAccessToken(refreshToken: string) {
  return client('auth/refresh-token-v2', {
    method: 'POST',
    token: refreshToken,
  }).then((response: any) => {
    console.log('refresh-token', response);
  });
}

export default refreshAccessToken;
