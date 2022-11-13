import { LoginForm } from './components';
import styled from 'styled-components';
import { useAuth } from 'hooks/useAuth';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
`;

function UnauthenticatedApp() {
  const { login } = useAuth();

  return (
    <Wrapper>
      <LoginForm onSubmit={login} />
    </Wrapper>
  );
}

export default UnauthenticatedApp;
