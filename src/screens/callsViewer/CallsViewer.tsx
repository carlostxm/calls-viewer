import { Pagination, Spacer } from '@aircall/tractor';
import { CallsPage as GroupedCallsPage } from 'components';
import { useCallsPage } from 'hooks/useCallsPage';

function CallsViewer() {
  const {
    page,
    isPageEmpty,
    activePage,
    pageSize,
    setActivePage,
    setPageSize,
  } = useCallsPage();

  if (isPageEmpty()) {
    return null;
  }

  const { totalCount, callsByDate } = page!;

  return (
    <Spacer space='s' direction='vertical' width='100%'>
      <Pagination
        activePage={activePage}
        onPageChange={setActivePage}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        recordsTotalCount={totalCount}
      />
      <GroupedCallsPage groupedCalls={callsByDate} />
    </Spacer>
  );
}

export default CallsViewer;
