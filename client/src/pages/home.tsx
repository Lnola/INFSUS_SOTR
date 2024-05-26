import styled from '@emotion/styled';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 10px;
`;

const HomePage = () => {
  return (
    <StyledContainer>
      <Typography variant="h2" gutterBottom>
        Transport management system
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Link to="/orders">
            <StyledButton variant="contained" color="primary">
              Manage Orders
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/trucks">
            <StyledButton variant="contained" color="primary">
              Manage Trucks
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/trailers">
            <StyledButton variant="contained" color="primary">
              Manage Trailers
            </StyledButton>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/drivers">
            <StyledButton variant="contained" color="primary">
              Manage Drivers
            </StyledButton>
          </Link>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default HomePage;
