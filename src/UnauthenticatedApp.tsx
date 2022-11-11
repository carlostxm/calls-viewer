import { LoginForm } from './components';
import styled from 'styled-components';

interface UnathenticatedAppProps {
  login: (user: string, password: string) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
`;

function UnauthenticatedApp({ login }: UnathenticatedAppProps) {
  return (
    <Wrapper>
      <LoginForm login={login} />
    </Wrapper>
  );
}

export default UnauthenticatedApp;
