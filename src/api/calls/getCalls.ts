import { ApiCall } from 'api/model';
import { CallsPage, User } from 'model';
import { getShortDate, translateCallFromApi } from 'translators';
import { client } from 'api/client';

export interface CallsResponse {
  nodes: ApiCall[];
  totalCount: number;
  hasNextPage: boolean;
}

function handleGetCallsResponse(response: CallsResponse): CallsPage {
  const { hasNextPage, totalCount, nodes } = response;
  let callsByDate: CallsPage['callsByDate'] = {};

  nodes.forEach((node) => {
    const key = getShortDate(new Date(node.created_at));

    if (!callsByDate[key]) {
      callsByDate = {
        ...callsByDate,
        [key]: [],
      };
    }

    const translatedCall = translateCallFromApi(node);
    callsByDate[key].push(translatedCall);
  });

  return {
    totalCount,
    hasNextPage,
    callsByDate,
  };
}

async function getCalls(
  offset: number,
  limit: number,
  { accessToken }: User
): Promise<CallsPage> {
  const url = `calls?offset=${offset}&limit=${limit}`;

  return client<CallsResponse>(url, { token: accessToken }).then(
    handleGetCallsResponse
  );
}

export default getCalls;
