import { Button } from '@mui/material';
import { useState } from 'react';
import { driverUrls } from '@/api';
import DriverAdd from '@/components/driver/DriverAdd';
import DriverList from '@/components/driver/DriverList';
import usePagination from '@/hooks/usePagination';
import Driver from '@/models/driver';

const DriverPage = () => {
  const { fetch, ...paginationProps } = usePagination<Driver[]>(driverUrls.get);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleEdit = (id: number) => () => {
    console.log('Edit', id);
  };
  const handleDelete = (id: number) => () => {
    console.log('Delete', id);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
        Add Driver
      </Button>
      <DriverList {...paginationProps} handleEdit={handleEdit} handleDelete={handleDelete} />
      {isAddDialogOpen && <DriverAdd isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} refetchDrivers={fetch} />}
    </>
  );
};

export default DriverPage;
