import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should call to login callback with filled username and password', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
  });
});
