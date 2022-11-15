import { Table, RowActionType } from '@aircall/tractor';
import { useRef } from 'react';
import { Call } from 'model';

const COLUMNS_CONFIG = [
  {
    id: 'via',
    label: 'Via',
    sortable: true,
  },
  {
    id: 'callType',
    label: 'Call Type',
  },
  {
    id: 'from',
    label: 'From',
  },
  {
    id: 'to',
    label: 'To',
  },
  {
    id: 'duration',
    label: 'Duration',
  },
  {
    id: 'isArchived',
    label: 'Archived',
  },
];

interface CallsTableProps {
  calls: Call[];
  onViewCall: (call: Call) => void;
  onArchiveCalls: (calls: Call[]) => void;
}

function CallsTable({ calls, onViewCall, onArchiveCalls }: CallsTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  function handleViewClick(call: Call) {
    onViewCall(call);
  }

  return (
    <div
      ref={tableRef}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '8px',
      }}
    >
      <Table
        bulkActions={[
          {
            label: 'Archive',
            onExecute: onArchiveCalls,
          },
        ]}
        rowActions={[
          {
            label: 'View',
            onExecute: handleViewClick,
          },
        ]}
        rowActionsType={RowActionType.Inline}
        columns={COLUMNS_CONFIG}
        data={calls}
        verticalScrollingParent={tableRef}
      />
    </div>
  );
}

export default CallsTable;
