import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { driverUrls } from '@/api';
import Error from '@/components/common/Error';
import { StyledDataGridContainer } from '@/components/common/styled/StyledDataGridContainer';
import usePagination from '@/hooks/usePagination';
import Driver from '@/models/driver';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
  { field: 'employmentStartDate', headerName: 'Employment Start Date', width: 130, type: 'string' },
  { field: 'employmentEndDate', headerName: 'Employment End Date', width: 130, type: 'string' },
];

const DriverList = () => {
  const { data, count, isLoading, error, paginationModel, setPaginationModel } = usePagination<Driver[]>(
    driverUrls.get,
  );

  if (error) return <Error error={error || 'Missing data'} />;
  return (
    <StyledDataGridContainer>
      <DataGrid
        columns={columns}
        rows={data || []}
        rowCount={count}
        loading={isLoading}
        pageSizeOptions={[1, 5, 10]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </StyledDataGridContainer>
  );
};

export default DriverList;
