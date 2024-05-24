import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

type Driver = {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  employmentStartDate: Date;
  employmentEndDate?: Date;
};

const DUMMY_DRIVERS: Driver[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', contactNumber: '1234567890', employmentStartDate: new Date() },
  { id: 2, firstName: 'Jane', lastName: 'Doe', contactNumber: '0987654321', employmentStartDate: new Date() },
];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
  { field: 'employmentStartDate', headerName: 'Employment Start Date', width: 130, type: 'date' },
  { field: 'employmentEndDate', headerName: 'Employment End Date', width: 130, type: 'date' },
];

const DriverList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setDrivers(DUMMY_DRIVERS);
    }, 1000);
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={drivers}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default DriverList;
