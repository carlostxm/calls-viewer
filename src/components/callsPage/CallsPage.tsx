import { Accordion, Box, Typography, Button, Spacer } from '@aircall/tractor';
import archiveCall from 'api/calls/archiveCalls';
import { CallDetails, CallsTable, Drawer } from 'components';
import { useAuth } from 'hooks';
import { Call } from 'model';
import { useState, useMemo } from 'react';

interface CallsPageProps {
  groupedCalls: Record<string, Call[]>;
}

function CallsPage({ groupedCalls }: CallsPageProps) {
  const titles = useMemo(
    () => Array.from(Object.keys(groupedCalls)).sort(),
    [groupedCalls]
  );
  const {
    state: { user },
  } = useAuth();

  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  function closeModal() {
    setSelectedCall(null);
  }

  function handleArchiveCalls(calls: Call[]) {
    calls.forEach((call) => archiveCall(call, user!));
  }

  function handleViewCall(call: Call) {
    setSelectedCall(call);
  }

  const isModalOpen = Boolean(selectedCall);

  return (
    <div>
      <Accordion.Container defaultSelected={0}>
        {titles.map((title, index) => (
          <Accordion.Item id={index} key={title}>
            <Accordion.Header>
              <Box
                backgroundColor='#E8E8E6'
                p='s'
                width='100%'
                cursor='pointer'
              >
                <Typography variant='subheading'>{title}</Typography>
              </Box>
            </Accordion.Header>
            <Accordion.Body>
              <CallsTable
                calls={groupedCalls[title]}
                onViewCall={handleViewCall}
                onArchiveCalls={handleArchiveCalls}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion.Container>
      <Drawer isOpen={isModalOpen}>
        <Spacer space='s' direction='vertical' width='100%'>
          {/*Button placed first intentionally as is the only way to close the Drawer, more info in Drawer inside the Drawer component*/}
          <Button onClick={closeModal}>Close</Button>
          <CallDetails call={selectedCall} />
        </Spacer>
      </Drawer>
    </div>
  );
}

export default CallsPage;
