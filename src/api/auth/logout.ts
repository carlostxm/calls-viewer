import {
  AUTH_PROVIDER_ACCESS_TOKEN_KEY,
  AUTH_PROVIDER_REFRESH_TOKEN_KEY,
} from './config';

async function logout() {
  window.localStorage.removeItem(AUTH_PROVIDER_ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_PROVIDER_REFRESH_TOKEN_KEY);
}

export default logout;
