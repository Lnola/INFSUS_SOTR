import styled from '@emotion/styled'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddNewTruckModal from './Components/AddNewTruckModal';
import EditTruckModal from './Components/EditTruckModal';
import Truck from './Model/Truck';


const Button = styled.button(props => ({
  height: '25px',
  backgroundColor: props.color,
  borderRadius: '5px',
  boxShadow: '3px 3px 5px #888888'
}))

const MyCenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`

const EditButton = ({ id, setShowEditModal, setEditTruckId }: { id: number; setShowEditModal: (show: boolean) => void; setEditTruckId: (editId: number) => void}) => {
  return (
    <Button color="green" onClick={() => {setShowEditModal(true); setEditTruckId(id)}}>Edit</Button>
  )
}

const DeleteButton = ({ id }: { id: number }) => {
  return (
    <Button color="red" onClick={() => console.log(`Delete ${id}`)}>Delete</Button>
  )
}

const AddNewTruckButton = ({setShowAddNewModal}: {setShowAddNewModal: (show: boolean) => void}) => {
  return (
    <Button style={{height: '35px'}} color="blue" onClick={() => setShowAddNewModal(true)}>Add new truck</Button>
  )
}

const DUMMY_TRUCKS: Truck[] = [
  { id: 1, registration: 'VŽ-393-OL', makeYear: '2019', reservoirCapacity: 1420, horsepower: 480},
  { id: 2, registration: 'VŽ-999-IH', makeYear: '2017', reservoirCapacity: 1200, horsepower: 350},
  { id: 3, registration: 'VŽ-996-GF', makeYear: '2017', reservoirCapacity: 1350, horsepower: 410},
  { id: 4, registration: 'VŽ-402-UU', makeYear: '2023', reservoirCapacity: 1330, horsepower: 450},
  { id: 5, registration: 'VŽ-252-RR', makeYear: '2022', reservoirCapacity: 1500, horsepower: 520},
  { id: 6, registration: 'VŽ-393-OL', makeYear: '2019', reservoirCapacity: 1420, horsepower: 480},
  { id: 7, registration: 'VŽ-999-IH', makeYear: '2017', reservoirCapacity: 1200, horsepower: 350},
  { id: 8, registration: 'VŽ-996-GF', makeYear: '2017', reservoirCapacity: 1350, horsepower: 410},
  { id: 9, registration: 'VŽ-402-UU', makeYear: '2023', reservoirCapacity: 1330, horsepower: 450},
  { id: 10, registration: 'VŽ-252-RR', makeYear: '2022', reservoirCapacity: 1500, horsepower: 520},
];


const TruckList = () => {
  const [alignment, setAlignment] = React.useState('web');
  const navigate = useNavigate();
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [showEditModal, setShowEditModal] = useState(false)
  const [editTruckId, setEditTruckId] = useState<number | null>(null)
  const [showAddNewModal, setShowAddNewModal] = useState(false)
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false)

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'registration', headerName: 'Registration', width: 130 },
    { field: 'makeYear', headerName: 'Make year', type: 'number', width: 80 },
    { field: 'reservoirCapacity', headerName: 'Reservoir', type: 'number', width: 90,},
    { field: 'horsepower', headerName: 'Horsepower', type: 'number', width: 90,},
    {
      field: 'edit',
      headerName: 'Edit truck',
      width: 120,
      renderCell: (params) => <MyCenteredContainer style={{alignItems: 'center', width: '100%', height: '100%', margin:'0px'}}>
      <EditButton id={params.row.id} setShowEditModal={setShowEditModal} setEditTruckId={setEditTruckId}/>
    </MyCenteredContainer>,
    },
    {
      field: 'delete',
      headerName: 'Delete truck',
      width: 120,
      renderCell: (params) => <MyCenteredContainer style={{alignItems: 'center', width: '100%', height: '100%', margin:'0px'}}>
      <DeleteButton id={params.row.id} />
    </MyCenteredContainer>,
    },
  ];

  // Fetch mock function
  useEffect(() => {
    setTimeout(() => {
      setTrucks(DUMMY_TRUCKS);
    }, 1000);
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccessSnackbar(false);
  };

  return (
    <>
      {/* toggle buttons */}
      <MyCenteredContainer>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton selected value="trucks">Trucks</ToggleButton>
          <ToggleButton value="trailers" onClick={() => navigate('/trailers')}>Trailers</ToggleButton>
        </ToggleButtonGroup>
      </MyCenteredContainer>

      {/* Add new truck Button */}
      <MyCenteredContainer>
        <AddNewTruckButton setShowAddNewModal={setShowAddNewModal}></AddNewTruckButton>
      </MyCenteredContainer>

      {/* Data Table */}
      <MyCenteredContainer style={{ minHeight: '50%'}}>
        <div style={{maxWidth: '80%'}}>
          <DataGrid
            rows={trucks}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </MyCenteredContainer>
      {/* Edit Modal */}
      {showEditModal && <EditTruckModal truck={trucks.find((truck) => truck.id == editTruckId)} setShowEditModal={setShowEditModal} setShowSuccessSnackbar={setShowSuccessSnackbar}/>}
      {/* Add new Modal */}
      {showAddNewModal && <AddNewTruckModal setShowAddNewModal={setShowAddNewModal} setShowSuccessSnackbar={setShowSuccessSnackbar}/>}

      <Snackbar open={showSuccessSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity='success'
          variant="filled"
          sx={{ width: '100%' }}
        >
          Action performed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TruckList;


