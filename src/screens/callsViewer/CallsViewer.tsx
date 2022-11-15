import { useCallback, useEffect } from 'react';
import { Pagination, Spacer } from '@aircall/tractor';
import { CallsPage as GroupedCallsPage } from 'components';
import { getCalls, subscribePushChannel } from 'api';
import { CallsPage, User } from 'model';
import { useAuth } from 'hooks/useAuth';
import { useCallsPage } from 'hooks/useCallsPage';
import { translateCallFromApi } from 'translators';
import { ApiCall } from 'api/model';

async function fetchCalls(
  pageNumber: number,
  size: number,
  user: User
): Promise<CallsPage> {
  const offset = (pageNumber - 1) * size;
  const limit = pageNumber * size;

  return getCalls(offset, limit, user);
}

function CallsViewer() {
  const {
    page,
    setPage,
    updateCall,
    isPageEmpty,
    activePage,
    pageSize,
    setActivePage,
    setPageSize,
  } = useCallsPage();

  const {
    state: { user },
  } = useAuth();

  const handlePushEvent = useCallback(
    (node: ApiCall) => {
      const call = translateCallFromApi(node);

      updateCall(call);
    },
    [updateCall]
  );

  useEffect(() => {
    if (!user) {
      setPage(null);
      return;
    }

    fetchCalls(activePage, pageSize, user).then((calls) => setPage(calls));
  }, [user, setPage, activePage, pageSize]);

  useEffect(() => {
    if (!user) {
      return;
    }

    subscribePushChannel(user, handlePushEvent);
  }, [user, handlePushEvent]);

  function handlePageSize(newPageSize: number) {
    setPageSize(newPageSize);
  }

  function handlePageChange(newPageNumber: number) {
    setActivePage(newPageNumber);
  }

  if (isPageEmpty()) {
    return <div>No calls 1</div>;
  }

  const { totalCount, callsByDate } = page!;

  return (
    <Spacer data-testid='app' space='s' direction='vertical' width='100%'>
      <Pagination
        activePage={activePage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSize}
        pageSize={pageSize}
        recordsTotalCount={totalCount}
      />
      <GroupedCallsPage groupedCalls={callsByDate} />
    </Spacer>
  );
}

export default CallsViewer;
