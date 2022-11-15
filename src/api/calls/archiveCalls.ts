import { client } from 'api/client';
import { ApiCall } from 'api/model';
import { Call, User } from 'model';
import { translateCallFromApi } from 'translators';

function handleResponse(node: ApiCall): Call {
  console.log(`Call has been archived successfully: ${node}`);
  return translateCallFromApi(node);
}

function archiveCall({ id }: Call, { accessToken }: User): Promise<Call> {
  const url = `calls/${id}/archive`;

  return client<ApiCall>(url, { method: 'PUT', token: accessToken }).then(
    handleResponse
  );
}

export default archiveCall;
