import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogisticsOperationAdd from '@/components/order-detail/LogisticsOperationAdd';
import OrderUpdate from '@/components/order-detail/OrderUpdate';
import usePagination from '@/hooks/usePagination';
import LogisticsOperation from '@/models/logistics-operation';
import Order from '@/models/order';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const EditButton = ({ handleEdit, rowParams }) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={() => {
        handleEdit(rowParams);
      }}
    >
      Edit
    </Button>
  );
};

const DeleteButton = ({ id, onChangeRerender, setOnChangeRerender }) => {
  const handleDelete = async (id: number) => {
    //const response = await fetch(`/api/logistics-operations/${id}`, {
    const response = await fetch(`/api/logistics-operations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      toast.success('Success!');
      setOnChangeRerender(!onChangeRerender);
    } else {
      toast.error(`Failed to delete record.`);
    }
  };
  return (
    <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>
      Delete
    </Button>
  );
};

const OrderDetailPage = () => {
  const { fetch: fetchNola } = usePagination<Order>('api/orders/1');
  const { id } = useParams<{ id: string }>();

  const [onChangeRerender, setOnChangeRerender] = useState(false);

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [utovari, setUtovari] = useState<LogisticsOperation[] | null>(null);
  const [istovari, setIstovari] = useState<LogisticsOperation[] | null>(null);

  //const { data: companyLocations } = useGet<CompanyLocation[]>({ path: companyLocation.getAll });

  // MODAL
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [logOperation, setLogOperation] = useState<LogisticsOperation>();

  // MODAL
  const handleEdit = (logOperation: LogisticsOperation) => {
    setLogOperation(logOperation);
    setIsAddDialogOpen(true);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<Order>(`/api/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        setError('Failed to fetch order details.');
      } finally {
        setIsLoading(false);
      }
    };
    const fetchLogisticsOperations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<LogisticsOperation[]>(`/api/logistics-operations`);
        const data = response.data;
        /* data.map(
          operation =>
            (operation.companyLocation = {
              id: operation.companyLocation,
              name: companyLocations?.find(location => location.id == operation.companyLocation)?.name,
            }),
        ); */
        setUtovari(data.filter(operation => operation.order == Number(id) && operation.type == 1));
        //console.log(utovari);
        setIstovari(data.filter(operation => operation.order == Number(id) && operation.type == 2));
      } catch (error) {
        setError('Failed to fetch order details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
    fetchLogisticsOperations();
  }, [id, onChangeRerender]);

  //console.log(utovari);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'isCompleted', headerName: 'Completed', type: 'boolean', width: 80 },
    { field: 'note', headerName: 'Note', width: 90 },
    /* {
      field: 'companyLocation',
      headerName: 'Company Location',
      width: 200,
      renderCell: params => <>{params.row.companyLocation.name}</>,
    }, */
    {
      field: 'companyLocation',
      headerName: 'Company Location',
      type: 'number',
      width: 200,
    },
    {
      field: 'edit',
      headerName: 'Edit operation',
      width: 120,
      renderCell: params => (
        <StyledContainer style={{ alignItems: 'center', width: '100%', height: '100%', margin: '0px' }}>
          <EditButton rowParams={params.row} handleEdit={handleEdit} />
        </StyledContainer>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete truck',
      width: 120,
      renderCell: params => (
        <StyledContainer style={{ alignItems: 'center', width: '100%', height: '100%', margin: '0px' }}>
          <DeleteButton
            id={params.row.id}
            onChangeRerender={onChangeRerender}
            setOnChangeRerender={setOnChangeRerender}
          />
        </StyledContainer>
      ),
    },
  ];

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>Order Detail Page (ID: {id})</h1>
      </div>
      <OrderUpdate refetchOrders={fetchNola} order={order} />
      <hr style={{ marginTop: '40px', marginBottom: '40px', border: '1px solid black' }} />
      <StyledContainer>
        <Button style={{ height: '35px' }} variant="contained" onClick={() => setIsAddDialogOpen(true)}>
          Add new log. operation
        </Button>
      </StyledContainer>
      <h2 style={{ textAlign: 'center' }}>Loadings</h2>
      {/* Data Table */}
      <StyledContainer style={{ minHeight: '50%' }}>
        <div style={{ maxWidth: '80%' }}>
          <DataGrid
            columns={columns}
            rows={utovari || []}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </StyledContainer>
      <h2 style={{ textAlign: 'center' }}>Unloadings</h2>
      {/* Data Table */}
      <StyledContainer style={{ minHeight: '50%' }}>
        <div style={{ maxWidth: '80%' }}>
          <DataGrid
            columns={columns}
            rows={istovari || []}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </StyledContainer>
      <LogisticsOperationAdd
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        refetchOrders={fetchNola}
        logOperation={logOperation}
        orderId={Number(id)}
        onChangeRerender={onChangeRerender}
        setOnChangeRerender={setOnChangeRerender}
      />
    </>
  );
};

export default OrderDetailPage;
