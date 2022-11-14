import { PropsWithChildren } from 'react';
import styled from 'styled-components';

// Basic Drawer component was implemented as I had some problems using @aircall/tractor Modal.
// Even configuring the portal property in the Modal component I couldnt show the modal properly.

interface Props {
  isOpen: boolean;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 500px;
  z-index: 1000;
  height: 100vh;
  transform: ${(props: Props) => (props.isOpen ? 'none' : 'translateX(100%)')};
  transition: 0.3s ease-out;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #d9d9d6;
  overflow: auto;
  padding: 1em;
`;

function Drawer({ children, isOpen }: PropsWithChildren<Props>) {
  return (
    <Wrapper isOpen={isOpen}>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default Drawer;
