import { useEffect, useState } from 'react';
import { Pagination, Spacer } from '@aircall/tractor';
import { CallsPage as GroupedCallsPage } from 'components';
import { getCalls } from 'api';
import { CallsPage, User } from 'model';

interface CallsViewerProps {
  user: User;
}

async function fetchCalls(
  pageNumber: number,
  size: number,
  user: User
): Promise<CallsPage> {
  const offset = (pageNumber - 1) * size;
  const limit = pageNumber * size;

  return getCalls(offset, limit, user);
}

function CallsViewer({ user }: CallsViewerProps) {
  const [page, setPage] = useState<CallsPage | null>(null);
  const [pageSize, setPageSize] = useState<number>(25);
  const [activePage, setActivePage] = useState<number>(1);

  useEffect(() => {
    if (!user) {
      setPage(null);
    }

    fetchCalls(activePage, pageSize, user).then((calls) => setPage(calls));
  }, [user, setPage, activePage, pageSize]);

  function handlePageSize(newPageSize: number) {
    setPageSize(newPageSize);
  }

  function handlePageChange(newPageNumber: number) {
    setActivePage(newPageNumber);
  }

  if (!page?.callsByDate.size) {
    return <div>No calls 1</div>;
  }

  const { totalCount, callsByDate } = page;

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
