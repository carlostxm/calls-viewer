import { Accordion, Box, Typography, Button, Spacer } from '@aircall/tractor';
import { CallDetails, CallsTable, Drawer } from 'components';
import { Call } from 'model';
import { useState, useMemo } from 'react';

interface CallsPageProps {
  groupedCalls: Map<string, Call[]>;
}
function CallsPage({ groupedCalls }: CallsPageProps) {
  const titles = useMemo(
    () => Array.from(groupedCalls.keys()).sort(),
    [groupedCalls]
  );
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const closeModal = () => setSelectedCall(null);

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
                calls={groupedCalls.get(title)!}
                onViewCall={(call) => {
                  setSelectedCall(call);
                }}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion.Container>
      <Drawer isOpen={isModalOpen}>
        <Spacer space='s' direction='vertical' width='100%'>
          <CallDetails call={selectedCall} />
          <Button onClick={closeModal}>Close</Button>
        </Spacer>
      </Drawer>
    </div>
  );
}

export default CallsPage;
