import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const StyledOutlet = styled.main`
  padding: 1rem;
`;

const Layout = () => {
  return (
    <>
      <Navbar />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </>
  );
};

export default Layout;
