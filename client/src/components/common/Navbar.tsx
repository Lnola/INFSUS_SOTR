import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Transport Management System
        </Typography>
        <StyledLink to="/">
          <Button color="inherit">Home</Button>
        </StyledLink>
        <StyledLink to="/orders">
          <Button color="inherit">Orders</Button>
        </StyledLink>
        <StyledLink to="/trucks">
          <Button color="inherit">Trucks</Button>
        </StyledLink>
        <StyledLink to="/trailers">
          <Button color="inherit">Trailers</Button>
        </StyledLink>
        <StyledLink to="/drivers">
          <Button color="inherit">Drivers</Button>
        </StyledLink>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
