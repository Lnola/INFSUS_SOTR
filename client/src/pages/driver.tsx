import { Button } from '@mui/material';
import { useState } from 'react';
import DriverAdd from '@/components/driver/DriverAdd';
import DriverList from '@/components/driver/DriverList';

const Driver = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
        Add Driver
      </Button>
      <DriverList />
      {isAddDialogOpen && <DriverAdd isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />}
    </>
  );
};

export default Driver;
