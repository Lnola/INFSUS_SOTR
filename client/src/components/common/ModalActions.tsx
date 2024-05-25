import styled from '@emotion/styled';
import { Button } from '@mui/material';

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 20%;
  padding-right: 20%;
  padding-bottom: 20px;
`;

type Props = {
  handleClose: (args: any) => void;
};

const ModalActions = ({ handleClose }: Props) => {
  return (
    <StyledButtonContainer>
      <Button type="submit" variant="contained">
        Save
      </Button>
      <Button type="button" variant="outlined" onClick={() => handleClose(false)}>
        Close
      </Button>
    </StyledButtonContainer>
  );
};

export default ModalActions;
