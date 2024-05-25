import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import { useState } from 'react';
import ModalActions from '@/components/common/ModalActions';
import { StyledForm, StyledModal, StyledModalContainer } from '@/components/common/styled/StyledModal';

const EditTruckModal = ({
  setShowAddNewModal,
  setShowSuccessSnackbar,
}: {
  setShowAddNewModal: (show: boolean) => void;
  setShowSuccessSnackbar: (show: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    registration: '',
    makeYear: '0',
    reservoirCapacity: 0,
    horsepower: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [snackbarStatus, setSnackbarStatus] = React.useState<'error' | 'success' | 'warning'>('warning');
  const [snackbarText, setSnackbarText] = React.useState('Neki default text');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/trucks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: null, ...formData }),
    });

    if (response.ok) {
      setSnackbarStatus('success');
      setSnackbarText('Truck added successfully!');
      setShowSuccessSnackbar(true);
      setShowAddNewModal(false);
    } else {
      setSnackbarStatus('error');
      setSnackbarText('Action was not successful!');
      setOpen(true);
    }
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <StyledModalContainer>
      <StyledModal>
        <div style={{ height: '100%' }}>
          <p style={{ textAlign: 'center', margin: '0.75em' }}>
            <strong>ADD NEW TRUCK</strong>
          </p>
          <StyledForm onSubmit={handleSubmit}>
            <div>
              <div>
                <label>Registration: </label>
                <input type="text" name="registration" value={formData.registration} onChange={handleChange} />
              </div>
              <div>
                <label>Make Year: </label>
                <input type="number" name="makeYear" value={formData.makeYear} onChange={handleChange} />
              </div>
              <div>
                <label>Reservoir Capacity: </label>
                <input
                  type="number"
                  name="reservoirCapacity"
                  value={formData.reservoirCapacity}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Horsepower: </label>
                <input type="number" name="horsepower" value={formData.horsepower} onChange={handleChange} />
              </div>
            </div>
            <ModalActions handleClose={setShowAddNewModal} />
          </StyledForm>
        </div>
      </StyledModal>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarStatus} variant="filled" sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </StyledModalContainer>
  );
};

export default EditTruckModal;
