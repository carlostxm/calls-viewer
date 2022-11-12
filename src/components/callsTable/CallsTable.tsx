import { Tractor, Table } from '@aircall/tractor';
import { useRef } from 'react';
import { Call } from 'model';

const COLUMNS_CONFIG = [
  {
    id: 'via',
    label: 'Via',
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
}

function CallsTable({ calls }: CallsTableProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{
        // height: '500px',
        overflowY: 'auto',
      }}
    >
      <Tractor>
        <Table
          bulkActions={[
            {
              label: 'View',
              onExecute: function noRefCheck() {},
            },
            {
              label: 'Delete',
              onExecute: function noRefCheck() {},
              // renderer: function noRefCheck() {},
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
