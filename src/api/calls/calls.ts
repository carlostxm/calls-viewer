import { ApiCall } from 'api/model';
import { CallsPage, User } from 'model';
import { getShortDate, translateCallFromApi } from 'translators';
import { client } from './api-client';

interface CallsResponse {
  nodes: ApiCall[];
  totalCount: number;
  hasNextPage: boolean;
}

function handleGetCallsResponse(response: CallsResponse): CallsPage {
  const { hasNextPage, totalCount, nodes } = response;
  const callsByDate = new Map();

  nodes.forEach((node) => {
    const key = getShortDate(new Date(node.created_at));

    if (!callsByDate.has(key)) {
      callsByDate.set(key, []);
    }

    const translatedCall = translateCallFromApi(node);
    callsByDate.get(key).push(translatedCall);
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
  { token }: User
): Promise<CallsPage> {
  const url = `calls?offset=${offset}&limit=${limit}`;

  return client<CallsResponse>(url, { token }).then(handleGetCallsResponse);
}

export default getCalls;
