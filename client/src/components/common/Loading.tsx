import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const StyledFullScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

type Props = {
  isLoading: boolean;
};

const Loading = ({ isLoading }: Props) => {
  if (isLoading)
    return (
      <StyledFullScreen>
        <CircularProgress />
      </StyledFullScreen>
    );
  return <></>;
};

export default Loading;
