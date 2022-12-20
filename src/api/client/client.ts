import { logout, refreshAccessToken } from 'api/auth';
import { AUTH_PROVIDER_ACCESS_TOKEN_KEY } from 'api/auth/config';

const apiURL = process.env.REACT_APP_API_URL;

type CustomConfig = Partial<{
  data: Record<string, unknown>;
  token: string;
  headers: Record<string, unknown>;
  method: 'POST' | 'GET' | 'PUT';
}> &
  Record<string, unknown>;

function getMethodOrBestEffort(
  method: CustomConfig['method'],
  data?: Record<string, unknown>
) {
  return method ?? (data ? 'POST' : 'GET');
}

async function client<T = unknown>(
  endpoint: string,
  { method, data, headers: customHeaders, ...customConfig }: CustomConfig = {}
): Promise<T> {
  const accessToken = await localStorage.getItem(
    AUTH_PROVIDER_ACCESS_TOKEN_KEY
  );

  const config = {
    method: getMethodOrBestEffort(method, data),
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(data ? { 'Content-Type': 'application/json' } : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        try {
          await refreshAccessToken();
          const promise = new Promise((resolve, reject) =>
            setTimeout(
              () =>
                resolve(
                  client(endpoint, {
                    method,
                    data,
                    headers: customHeaders,
                    ...customConfig,
                  })
                ),
              500
            )
          );
          return promise;
        } catch {
          console.error('error refreshing the token');
          await logout();
          // refresh the page
          window.location.reload();
        }

        return Promise.reject({ message: 'Please re-authenticate.' });
      }

      const result = await response.json();

      if (response.ok) {
        return result;
      }

      return Promise.reject(data);
    });
}

export default client;
