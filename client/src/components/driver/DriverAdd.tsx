import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { driverUrls } from '@/api';
import FormDialog from '@/components/common/FormDialog';
import { usePost } from '@/hooks/usePost';
import Driver from '@/models/driver';

const validate = (formData, setFormData) => {
  let isValid = true;
  if (formData.employmentEndDate && new Date(formData.employmentStartDate) > new Date(formData.employmentEndDate)) {
    setFormData(prev => ({ ...prev, employmentEndDateError: 'End Date must be after Start Date' }));
    isValid = false;
  } else {
    setFormData(prev => ({ ...prev, employmentEndDateError: '' }));
  }

  if (formData.contactNumber.length < 9 || formData.contactNumber.length > 11) {
    setFormData(prev => ({ ...prev, contactNumberError: 'Contact number must be between 9 and 11 digits' }));
    isValid = false;
  } else {
    setFormData(prev => ({ ...prev, contactNumberError: '' }));
  }

  return isValid;
};

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

const initialFormData = {
  firstName: '',
  firstNameError: '',
  lastName: '',
  lastNameError: '',
  contactNumber: '',
  contactNumberError: '',
  employmentStartDate: '',
  empoloymentStartDateError: '',
  employmentEndDate: null,
  employmentEndDateError: '',
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchDrivers: () => void;
  initFormData?: typeof initialFormData;
  driver?: Driver;
};

const DriverAdd = ({ isOpen, setIsOpen, refetchDrivers, driver }: Props) => {
  const [formData, setFormData] = useState({ ...initialFormData, ...driver });
  const { fetch: create, error } = usePost<any>({
    path: !driver || !driver.id ? driverUrls.create : driverUrls.update(driver.id!),
    params: { ...formData },
    start: false,
  });
  const [wasFetched, setWasFetched] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !validate(formData, setFormData)) return;
    await create();
    setWasFetched(true);
  };

  useEffect(() => {
    if (wasFetched) {
      if (!error) {
        setIsOpen(false);
        refetchDrivers();
        toast.success('Driver added successfully!');
      } else {
        toast.error(`Failed to add driver! ${error}`);
      }
    }
  }, [error, wasFetched, setIsOpen, refetchDrivers]);

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
          value={formData.employmentEndDate || ''}
          onChange={handleChange}
          error={!!formData.employmentEndDateError}
          helperText={formData.employmentEndDateError}
        />
      </StyledDatePickerContainer>
    </FormDialog>
  );
};

export default DriverAdd;
