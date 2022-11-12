import { Accordion, Box, Typography } from '@aircall/tractor';
import { CallsTable } from 'components';
import { Call } from 'model';
import { useMemo } from 'react';

interface CallsPageProps {
  groupedCalls: Map<string, Call[]>;
}

function CallsPage({ groupedCalls }: CallsPageProps) {
  const titles = useMemo(
    () => Array.from(groupedCalls.keys()).sort(),
    [groupedCalls]
  );

  return (
    <Accordion.Container defaultSelected={0}>
      {titles.map((title, index) => (
        <Accordion.Item id={index} key={title}>
          <Accordion.Header>
            <Box backgroundColor='#E8E8E6' p='s' width='100%' cursor='pointer'>
              <Typography variant='subheading'>{title}</Typography>
            </Box>
          </Accordion.Header>
          <Accordion.Body>
            <CallsTable calls={groupedCalls.get(title)!} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion.Container>
  );
}

export default CallsPage;
