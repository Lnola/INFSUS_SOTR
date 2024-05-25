import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Error from '@/components/common/Error';
import { StyledDataGridContainer } from '@/components/common/styled/StyledDataGridContainer';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
  { field: 'employmentStartDate', headerName: 'Employment Start Date', width: 130, type: 'string' },
  { field: 'employmentEndDate', headerName: 'Employment End Date', width: 130, type: 'string' },
];

const DriverList = ({ error, data, count, isLoading, paginationModel, setPaginationModel }) => {
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
