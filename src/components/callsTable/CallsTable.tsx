import { Tractor, Table, RowActionType } from '@aircall/tractor';
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
];

interface CallsTableProps {
  calls: Call[];
  onViewCall: (call: Call) => void;
}

function CallsTable({ calls, onViewCall }: CallsTableProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleViewClick(call: Call) {
    onViewCall(call);
  }

  return (
    <div
      ref={ref}
      style={{
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: '8px',
      }}
    >
      <Tractor>
        <Table
          bulkActions={[
            {
              label: 'Archive',
              onExecute: function noRefCheck() {},
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
          verticalScrollingParent={ref}
        />
      </Tractor>
    </div>
  );
}

export default CallsTable;
