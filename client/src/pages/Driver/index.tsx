import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useFetch from 'react-fetch-hook';
import { driverUrls } from '@/api';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';

type Driver = {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  employmentStartDate: Date;
  employmentEndDate?: Date;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
  { field: 'employmentStartDate', headerName: 'Employment Start Date', width: 130, type: 'string' },
  { field: 'employmentEndDate', headerName: 'Employment End Date', width: 130, type: 'string' },
];

const DriverList = () => {
  const { isLoading, data: drivers, error } = useFetch<Driver[]>(driverUrls.getAll);

  if (error) return <Error error={error} />;
  if (isLoading) return <Loading />;
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
