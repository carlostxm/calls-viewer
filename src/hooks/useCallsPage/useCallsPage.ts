import { subscribePushChannel } from 'api/auth';
import { getCalls } from 'api/calls';
import { useAuth } from 'hooks/useAuth';
import { CallsPage, Call, User } from 'model';
import { useCallback, useReducer, useState, useEffect, useRef } from 'react';
import { callsPageReducer, State, ActionType } from 'reducers/callsPageReducer';

const DEFAULT_PAGE_SIZE = 25;
const DEFAULT_ACTIVE_PAGE = 1;

async function fetchCalls(
  pageNumber: number,
  size: number,
  user: User
): Promise<CallsPage> {
  const offset = (pageNumber - 1) * size;
  const limit = pageNumber * size;

  return getCalls(offset, limit, user);
}

function useCallsPage() {
  const [page, dispatch] = useReducer<
    (state: State, action: ActionType) => State
  >(callsPageReducer, null);

  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [activePage, setActivePage] = useState<number>(DEFAULT_ACTIVE_PAGE);

  const {
    state: { user },
  } = useAuth();

  const isSubscribed = useRef<boolean>(false);

  function isPageEmpty() {
    return !(page?.callsByDate && Object.keys(page.callsByDate).length > 0);
  }

  const setPage = useCallback((page: CallsPage | null) => {
    dispatch({ type: 'set-page', payload: page });
  }, []);

  const updateCall = useCallback((call: Call) => {
    dispatch({ type: 'update-call', payload: call });
  }, []);

  useEffect(() => {
    if (!user) {
      setPage(null);
      return;
    }

    fetchCalls(activePage, pageSize, user).then((calls) => setPage(calls));
  }, [user, activePage, pageSize, setPage]);

  useEffect(() => {
    if (!user || isSubscribed.current) {
      return;
    }

    isSubscribed.current = true;
    subscribePushChannel(user, updateCall);
  }, [user, isSubscribed, updateCall]);

  return {
    page,
    isPageEmpty,
    setPage,
    updateCall,
    pageSize,
    setPageSize,
    activePage,
    setActivePage,
  };
}

export default useCallsPage;
