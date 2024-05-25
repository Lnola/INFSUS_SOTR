import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useState } from 'react';
import FormDialog from '@/components/common/FormDialog';

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

const DriverAdd = ({ isOpen, setIsOpen }: Props) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    employmentStartDate: '',
    employmentEndDate: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    setIsOpen(false);
  };

  return (
    <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Add Driver" handleSubmit={handleSubmit}>
      <TextField
        name="firstName"
        label="First Name"
        variant="standard"
        value={formData.firstName}
        onChange={handleChange}
      />
      <TextField
        name="lastName"
        label="Last Name"
        variant="standard"
        value={formData.lastName}
        onChange={handleChange}
      />
      <TextField
        name="contactNumber"
        label="Contact Number"
        variant="standard"
        type="number"
        value={formData.contactNumber}
        onChange={handleChange}
      />
      <StyledDatePickerContainer>
        <TextField
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
