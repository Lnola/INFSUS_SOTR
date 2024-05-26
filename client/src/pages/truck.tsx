import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewTruckModal from '@/components/truck/AddNewTruckModal';
import EditTruckModal from '@/components/truck/EditTruckModal';
import usePagination from '@/hooks/usePagination';
import Truck from '@/models/truck';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const EditButton = ({
  id,
  setShowEditModal,
  setEditTruckId,
}: {
  id: number;
  setShowEditModal: (show: boolean) => void;
  setEditTruckId: (editId: number) => void;
}) => {
  return (
    <Button
      variant="contained"
      color="success"
      onClick={() => {
        setShowEditModal(true);
        setEditTruckId(id);
      }}
    >
      Edit
    </Button>
  );
};

const DeleteButton = ({ id, setShowSuccessSnackbar, setShowErrorSnackbar, setOnChangeRerender, onChangeRerender }) => {
  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/trucks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setShowSuccessSnackbar(true);
      setOnChangeRerender(!onChangeRerender);
    } else {
      setShowErrorSnackbar(true);
    }
  };

  return (
    <Button variant="outlined" color="error" onClick={() => handleDelete(id)}>
      Delete
    </Button>
  );
};

const AddNewTruckButton = ({ setShowAddNewModal }: { setShowAddNewModal: (show: boolean) => void }) => {
  return (
    <Button style={{ height: '35px' }} variant="contained" onClick={() => setShowAddNewModal(true)}>
      Add new truck
    </Button>
  );
};

const TruckList = () => {
  const [alignment, setAlignment] = React.useState('web');
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTruckId, setEditTruckId] = useState<number | null>(null);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [onChangeRerender, setOnChangeRerender] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'registration', headerName: 'Registration', width: 130 },
    { field: 'productionYear', headerName: 'Production year', type: 'number', width: 80 },
    { field: 'tankCapacity', headerName: 'Tank', type: 'number', width: 90 },
    { field: 'horsepower', headerName: 'Horsepower', type: 'number', width: 90 },
    {
      field: 'edit',
      headerName: 'Edit truck',
      width: 120,
      renderCell: params => (
        <StyledContainer style={{ alignItems: 'center', width: '100%', height: '100%', margin: '0px' }}>
          <EditButton id={params.row.id} setShowEditModal={setShowEditModal} setEditTruckId={setEditTruckId} />
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
            setShowErrorSnackbar={setShowErrorSnackbar}
            setShowSuccessSnackbar={setShowSuccessSnackbar}
            setOnChangeRerender={setOnChangeRerender}
            onChangeRerender={onChangeRerender}
          />
        </StyledContainer>
      ),
    },
  ];

  const { fetch, data, count, isLoading, paginationModel, setPaginationModel } = usePagination<Truck>('/api/trucks');

  useEffect(() => {
    fetch();
  }, [onChangeRerender, fetch]);

  const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccessSnackbar(false);
    setShowErrorSnackbar(false);
  };

  return (
    <>
      {/* toggle buttons */}
      <StyledContainer>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
          <ToggleButton selected value="trucks">
            Trucks
          </ToggleButton>
          <ToggleButton value="trailers" onClick={() => navigate('/trailers')}>
            Trailers
          </ToggleButton>
        </ToggleButtonGroup>
      </StyledContainer>

      {/* Add new truck Button */}
      <StyledContainer>
        <AddNewTruckButton setShowAddNewModal={setShowAddNewModal}></AddNewTruckButton>
      </StyledContainer>

      {/* Data Table */}
      <StyledContainer style={{ minHeight: '50%' }}>
        <div style={{ maxWidth: '80%' }}>
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
        </div>
      </StyledContainer>
      {/* Edit Modal */}
      {showEditModal && data && (
        <EditTruckModal
          truck={data?.find(truck => truck.id == editTruckId)}
          setShowEditModal={setShowEditModal}
          setShowSuccessSnackbar={setShowSuccessSnackbar}
          setOnChangeRerender={setOnChangeRerender}
          onChangeRerender={onChangeRerender}
        />
      )}
      {/* Add new Modal */}
      {showAddNewModal && (
        <AddNewTruckModal
          setShowAddNewModal={setShowAddNewModal}
          setShowSuccessSnackbar={setShowSuccessSnackbar}
          setOnChangeRerender={setOnChangeRerender}
          onChangeRerender={onChangeRerender}
        />
      )}

      <Snackbar open={showSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          Action performed successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={showErrorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
          Action failed!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TruckList;
