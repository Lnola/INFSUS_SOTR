import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Error from '@/components/common/Error';
import { StyledDataGridContainer } from '@/components/common/styled/StyledDataGridContainer';

const OrderList = ({
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
    { field: 'serialNumber', headerName: 'Serial Number', width: 130 },
    { field: 'transportPrice', headerName: 'Transport Price', width: 130 },
    { field: 'distance', headerName: 'Distance', width: 130 },
    { field: 'truckRegistration', headerName: 'Truck Registration', width: 130 },
    { field: 'trailerRegistration', headerName: 'Trailer Registration', width: 130 },
    { field: 'financer', headerName: 'Financer Name', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'details',
      headerName: 'Details',
      width: 120,
      renderCell: params => (
        <Link to={`/orders/${params.row.id}`}>
          <Button variant="contained" color="success">
            Details
          </Button>
        </Link>
      ),
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

  const mappedData = useMemo(
    () =>
      data?.map(order => ({
        ...order,
        truckRegistration: order.truck.registration,
        trailerRegistration: order.trailer.registration,
        financer: order.financer.name,
        status: order.status.name,
      })),
    [data],
  );

  if (error) return <Error error={error || 'Missing data'} />;
  return (
    <StyledDataGridContainer>
      <DataGrid
        columns={columns}
        rows={mappedData || []}
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

export default OrderList;
