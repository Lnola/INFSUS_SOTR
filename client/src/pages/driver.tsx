import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [driverToDeleteId, setDriverToDeleteId] = useState<number | null>();

  const handleEdit = (driver: Driver) => {
    driver.employmentStartDate = format(driver.employmentStartDate, 'yyyy-MM-dd');
    driver.employmentEndDate = driver.employmentEndDate && format(driver.employmentEndDate, 'yyyy-MM-dd');
    setDriver(driver);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setConfirmDialogOpen(true);
    setDriverToDeleteId(id);
  };

  const resetConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setDriverToDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      if (!driverToDeleteId) throw new Error('Driver ID is not set');
      await removeDriver(driverToDeleteId);
      toast.success('Driver deleted');
      fetch();
    } catch (error) {
      toast.error('Failed to delete driver');
    } finally {
      resetConfirmDialog();
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
      {confirmDialogOpen && (
        <Dialog open={confirmDialogOpen} onClose={resetConfirmDialog}>
          <DialogTitle>Delete driver </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this driver? This action will delete the driver permanently along with the
              data depending on the driver.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetConfirmDialog}>Cancel</Button>
            <Button onClick={confirmDelete}>Continue</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default DriverPage;
