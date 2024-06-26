import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Error from '@/components/common/Error';
import { StyledDataGridContainer } from '@/components/common/styled/StyledDataGridContainer';

const DriverList = ({
  error,
  data,
  count,
  isLoading,
  paginationModel,
  setPaginationModel,
  handleEdit,
  handleDelete,
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
    {
      field: 'employmentStartDate',
      headerName: 'Employment Start Date',
      width: 130,
      type: 'date',
      valueFormatter: value => new Date(value).toLocaleDateString(),
    },
    {
      field: 'employmentEndDate',
      headerName: 'Employment End Date',
      width: 130,
      type: 'date',
      valueFormatter: value => (value ? new Date(value).toLocaleDateString() : null),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 120,
      renderCell: params => (
        <Button variant="contained" onClick={() => handleEdit(params.row)}>
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: params => (
        <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];

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
