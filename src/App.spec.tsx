import App from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('./components', () => ({
  LoginForm: ({
    login,
  }: {
    login: (user: string, password: string) => void;
  }) => (
    <button
      data-testid='login-submit'
      onClick={() => login('user', 'password')}
    ></button>
  ),
}));

jest.mock('./api', () => ({
  login: () => Promise.resolve('user'),
}));

describe('App', () => {
  it('should display the login form when user has not logged in', () => {
    render(<App />);
    const loginForm = screen.getByTestId('login-submit');
    expect(loginForm).toBeDefined();
  });

  it('should display the app when the user has logged in', async () => {
    render(<App />);
    const loginButton = screen.getByTestId('login-submit');
    userEvent.click(loginButton);
    const authenticatedApp = await screen.findByTestId('app');
    expect(authenticatedApp).toBeDefined();
  });
});
