import { TextField } from '@mui/material';
import { useState } from 'react';
import FormDialog from '../common/FormDialog';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DriverAdd = ({ isOpen, setIsOpen }: Props) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });

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
    </FormDialog>
  );
};

export default DriverAdd;
