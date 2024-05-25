import styled from '@emotion/styled';
import { FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const StyledFormControl = styled(FormControl)`
  gap: 1rem;
  margin-bottom: 2rem;
`;

type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FormDialog = ({ title, isOpen, setIsOpen, children, handleSubmit }: Props) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} id="dialog-form">
          <StyledFormControl fullWidth>{children}</StyledFormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button type="submit" form="dialog-form">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
