import { CallsPage, Call } from 'model';
import { useCallback, useReducer, useState } from 'react';
import { callsPageReducer, State, ActionType } from 'reducers/callsPageReducer';

function useCallsPage() {
  const [page, dispatch] = useReducer<
    (state: State, action: ActionType) => State
  >(callsPageReducer, null);
  const [pageSize, setPageSize] = useState<number>(25);
  const [activePage, setActivePage] = useState<number>(1);

  function isPageEmpty() {
    return !(page?.callsByDate && Object.keys(page.callsByDate).length > 0);
  }

  const setPage = useCallback((page: CallsPage | null) => {
    dispatch({ type: 'set-page', payload: page });
  }, []);

  const updateCall = useCallback((call: Call) => {
    dispatch({ type: 'update-call', payload: call });
  }, []);

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
