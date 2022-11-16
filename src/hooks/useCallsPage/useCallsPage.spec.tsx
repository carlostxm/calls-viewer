import { renderHook } from '@testing-library/react';
import useCallsPage from './useCallsPage';
import { useAuth } from 'hooks/useAuth';
import { AuthContextType } from 'context/auth/AuthContext';
import { getCalls } from 'api';
import {
  TEST_CALLS_PAGE,
  TEST_CALLS_PAGE_LONG,
  TEST_USER,
} from 'fixtures/calls';
import { act } from 'react-dom/test-utils';

jest.mock('api');
jest.mock('hooks/useAuth');

const mockedUseAuth = useAuth as jest.Mock<AuthContextType>;
const mockedGetCalls = getCalls as jest.Mock;

describe('useCallsPage', () => {
  beforeEach(() => {
    mockedUseAuth.mockImplementation(() => ({
      state: {
        user: TEST_USER,
        status: 'auth',
        error: null,
      },
      login: () => {},
    }));

    mockedGetCalls.mockImplementation(() => Promise.resolve(TEST_CALLS_PAGE));
  });

  describe('functions', () => {
    describe('setPage', () => {
      it('should set page given as a parameter', () => {
        const { result } = renderHook(() => useCallsPage());

        const { setPage } = result.current;

        act(() => {
          setPage(TEST_CALLS_PAGE_LONG);
        });

        expect(result.current.page?.hasNextPage).toBe(
          TEST_CALLS_PAGE_LONG.hasNextPage
        );
        expect(result.current.page?.totalCount).toBe(
          TEST_CALLS_PAGE_LONG.totalCount
        );
        expect(result.current.page?.callsByDate).toBe(
          TEST_CALLS_PAGE_LONG.callsByDate
        );
      });
    });
  });
});
