import { AUTH_PROVIDER_TOKEN_KEY } from './config';

async function logout() {
  window.localStorage.removeItem(AUTH_PROVIDER_TOKEN_KEY);
}

export default logout;
