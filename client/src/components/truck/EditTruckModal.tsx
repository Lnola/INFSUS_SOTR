import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import React from 'react';
import ModalActions from '@/components/common/ModalActions';
import { StyledForm, StyledModal, StyledModalContainer } from '@/components/common/styled/StyledModal';
import Truck from '@/models/truck';

const EditTruckModal = ({
  truck,
  setShowEditModal,
  setShowSuccessSnackbar,
}: {
  truck: Truck | undefined;
  setShowEditModal: (show: boolean) => void;
  setShowSuccessSnackbar: (show: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    registration: truck?.registration || '',
    makeYear: truck?.productionYear || '',
    reservoirCapacity: truck?.tankCapacity || 0,
    horsepower: truck?.horsepower || 0,
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
      body: JSON.stringify({ id: truck?.id, ...formData }),
    });

    if (response.ok) {
      setSnackbarStatus('success');
      setSnackbarText('Truck added successfully!');
      setShowSuccessSnackbar(true);
      setShowEditModal(false);
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
            <strong>EDIT TRUCK</strong>
          </p>
          <StyledForm onSubmit={handleSubmit}>
            <div>
              <div>
                <label>ID: </label>
                <input type="text" value={truck?.id} readOnly />
              </div>
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
            <ModalActions handleClose={setShowEditModal} />
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
