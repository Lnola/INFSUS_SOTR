import { Button } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { driverUrls } from '@/api';
import { removeDriver } from '@/api/driver';
import DriverAdd from '@/components/driver/DriverAdd';
import DriverList from '@/components/driver/DriverList';
import usePagination from '@/hooks/usePagination';
import Driver from '@/models/driver';

const DriverPage = () => {
  const { fetch, ...paginationProps } = usePagination<Driver[]>(driverUrls.get);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [driver, setDriver] = useState<Driver>();

  const handleEdit = (driver: Driver) => {
    driver.employmentStartDate = format(driver.employmentStartDate, 'yyyy-MM-dd');
    driver.employmentEndDate = driver.employmentEndDate && format(driver.employmentEndDate, 'yyyy-MM-dd');
    setDriver(driver);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await removeDriver(id);
      toast.success('Driver deleted');
      fetch();
    } catch (error) {
      toast.error('Failed to delete driver');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
        Add Driver
      </Button>
      <DriverList {...paginationProps} handleEdit={handleEdit} handleDelete={handleDelete} />
      {isAddDialogOpen && (
        <DriverAdd isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} refetchDrivers={fetch} driver={driver} />
      )}
    </>
  );
};

export default DriverPage;
