import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const StyledFullScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Loading = () => {
  return (
    <StyledFullScreen>
      <CircularProgress />
    </StyledFullScreen>
  );
};

export default Loading;
