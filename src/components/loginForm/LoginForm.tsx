import React from 'react';
import {
  Box,
  Button,
  Form,
  FormItem,
  Grid,
  TextFieldInput,
} from '@aircall/tractor';

interface LoginFormProps {
  login: (user: string, password: string) => void;
}

function LoginForm({ login }: LoginFormProps) {
  function handleFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const username = target.username.value;
    const password = target.password.value;

    login(username, password);
  }

  return (
    <Box width='400px' mx='auto'>
      <Form onSubmit={handleFormSubmit}>
        <Grid gridColumnGap={4} gridRowGap={5} gridTemplateColumns='1fr'>
          <FormItem label='User' name='username'>
            <TextFieldInput />
          </FormItem>
          <FormItem label='Password' name='password'>
            <TextFieldInput type='password' />
          </FormItem>
          <FormItem>
            <Button block type='submit'>
              Login
            </Button>
          </FormItem>
        </Grid>
      </Form>
    </Box>
  );
}

export default LoginForm;
