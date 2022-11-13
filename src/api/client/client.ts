import { logout } from 'api/auth';

const apiURL = process.env.REACT_APP_API_URL;

type CustomConfig = Partial<{
  data: Record<string, unknown>;
  token: string;
  headers: Record<string, unknown>;
  method: 'POST' | 'GET';
}> &
  Record<string, unknown>;

async function client<T = unknown>(
  endpoint: string,
  {
    method,
    data,
    token,
    headers: customHeaders,
    ...customConfig
  }: CustomConfig = {}
): Promise<T> {
  const config = {
    method: method ?? data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await logout();
        // refresh the page
        window.location.reload();
        return Promise.reject({ message: 'Please re-authenticate.' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export default client;
