import {
  Grid,
  TextFieldInput,
  Textarea,
  Box,
  Form,
  FormItem,
} from '@aircall/tractor';
import { Call } from 'model';

interface CallDetailsProps {
  call: Call | null;
}

function CallDetails({ call }: CallDetailsProps) {
  if (!call) {
    return null;
  }

  const { id, from, to, notes, createdAt, duration, via, callType } = call;

  return (
    <Box width='100%' mx='auto'>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid gridColumnGap={4} gridRowGap={5} gridTemplateColumns='1fr 1fr'>
          <FormItem label='From' name='from'>
            <TextFieldInput disabled={true} placeholder={from} />
          </FormItem>
          <FormItem label='To' name='to'>
            <TextFieldInput disabled={true} placeholder={to} />
          </FormItem>
          <FormItem label='Via' name='via'>
            <TextFieldInput disabled={true} placeholder={via} />
          </FormItem>
          <FormItem label='Call Type' name='call-type'>
            <TextFieldInput disabled={true} placeholder={callType} />
          </FormItem>
          <FormItem label='Created at' name='created-at'>
            <TextFieldInput disabled={true} placeholder={createdAt} />
          </FormItem>
          <FormItem label='Duration' name='duration'>
            <TextFieldInput disabled={true} placeholder={String(duration)} />
          </FormItem>
          <FormItem label='id' name='id' gridColumn='1 / 3'>
            <TextFieldInput disabled={true} placeholder={id} />
          </FormItem>
          {notes.map(({ id, content }, index) => (
            <FormItem
              key={id}
              label={`Note ${index}`}
              name='note'
              gridColumn='1 / 3'
            >
              <Textarea disabled={true} placeholder={content} />
            </FormItem>
          ))}
        </Grid>
      </Form>
    </Box>
  );
}

export default CallDetails;
