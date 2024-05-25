import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { driverUrls } from '@/api';
import FormDialog from '@/components/common/FormDialog';
import { usePost } from '@/hooks/usePost';

const StyledDatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;

  & > * {
    width: 100%;
  }
`;

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const initialFormData = {
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  contactNumber: '',
  contactNumberError: '',
  employmentStartDate: '',
  empoloymentStartDateError: '',
  employmentEndDate: '',
  employmentEndDateError: '',
};

const DriverAdd = ({ isOpen, setIsOpen }: Props) => {
  const [formData, setFormData] = useState(initialFormData);
  const { fetch: create } = usePost<any>({ path: driverUrls.create, params: formData, start: false });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (formData.contactNumber.length < 10 || formData.contactNumber.length > 12) {
      setFormData(prev => ({ ...prev, contactNumberError: 'Contact number must be between 10 and 12 digits' }));
      return;
    }
    await create();
    setIsOpen(false);
  };

  return (
    <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Add Driver" handleSubmit={handleSubmit}>
      <TextField
        required
        name="firstName"
        label="First Name"
        variant="standard"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        required
        name="lastName"
        label="Last Name"
        variant="standard"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        required
        name="contactNumber"
        label="Contact Number"
        variant="standard"
        type="number"
        value={formData.contactNumber}
        onChange={handleChange}
        error={!!formData.contactNumberError}
        helperText={formData.contactNumberError}
      />
      <StyledDatePickerContainer>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="employmentStartDate"
          label="Employment Start Date"
          variant="standard"
          type="date"
          value={formData.employmentStartDate}
          onChange={handleChange}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          name="employmentEndDate"
          label="Employment End Date"
          variant="standard"
          type="date"
          value={formData.employmentEndDate}
          onChange={handleChange}
        />
      </StyledDatePickerContainer>
    </FormDialog>
  );
};

export default DriverAdd;
