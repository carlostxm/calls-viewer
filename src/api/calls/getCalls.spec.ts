import { TEST_USER } from 'fixtures/calls';
import { getShortDate } from 'translators';
import getCalls, { CallsResponse } from './getCalls';

const CALLS_RESPONSE: CallsResponse = {
  nodes: [
    {
      id: '697fe248-c08e-447f-9704-1f41e84c83c3',
      duration: 55650,
      is_archived: false,
      from: '+33196331297',
      to: '+33104763354',
      direction: 'inbound',
      call_type: 'voicemail',
      via: '+33119054614',
      created_at: '2022-11-12T19:36:27.995Z',
      notes: [],
    },
  ],
  totalCount: 1,
  hasNextPage: false,
};

jest.mock('api/client', () => ({
  client: () => Promise.resolve(CALLS_RESPONSE),
}));

describe('getCalls', () => {
  it('should return calls from API indexed by date', async () => {
    const response = await getCalls(1, 1, TEST_USER);

    expect(response.totalCount).toBe(1);
    expect(response.hasNextPage).toBe(false);
    expect(Object.keys(response.callsByDate)[0]).toBe(
      getShortDate(new Date('2022-11-12T19:36:27.995Z'))
    );
  });
});
