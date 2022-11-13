import { Tractor, Table } from '@aircall/tractor';
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
  onViewCall: (calls: Call[]) => void;
}

function CallsTable({ calls, onViewCall }: CallsTableProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleViewClick(values: Call[]) {
    onViewCall(values);
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
              label: 'View',
              onExecute: handleViewClick,
            },
            {
              label: 'Archive',
              onExecute: function noRefCheck() {},
            },
          ]}
          columns={COLUMNS_CONFIG}
          data={calls}
          verticalScrollingParent={ref}
        />
      </Tractor>
    </div>
  );
}

export default CallsTable;
