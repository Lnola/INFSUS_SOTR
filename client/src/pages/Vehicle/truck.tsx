import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const EditButton = ({ id }: { id: number }) => {
  return (
    <button style={{height: 'min-content'}} onClick={() => console.log(`Edit ${id}`)}>Edit</button>
  )
}

const DeleteButton = ({ id }: { id: number }) => {
  return (
    <button style={{height: 'min-content'}} onClick={() => console.log(`Delete ${id}`)}>Delete</button>
  )
}

type Truck = {
  id: number;
  registration: string;
  makeYear: string;
  reservoarCapacity: number;
  horsepower: number;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'registration', headerName: 'Registration', width: 130 },
  { field: 'makeYear', headerName: 'Make year', type: 'number', width: 80 },
  { field: 'reservoarCapacity', headerName: 'Reservoar', type: 'number', width: 90,},
  { field: 'horsepower', headerName: 'Horsepower', type: 'number', width: 90,},
  {
    field: 'edit',
    headerName: 'Edit truck',
    width: 120,
    renderCell: (params) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
    <EditButton id={params.row.id} />
  </div>,
  },
  {
    field: 'delete',
    headerName: 'Delete truck',
    width: 120,
    renderCell: (params) => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
    <DeleteButton id={params.row.id} />
  </div>,
  },
];

const DUMMY_TRUCKS: Truck[] = [
  { id: 1, registration: 'VŽ-393-OL', makeYear: '2019', reservoarCapacity: 1420, horsepower: 480},
  { id: 2, registration: 'VŽ-999-IH', makeYear: '2017', reservoarCapacity: 1200, horsepower: 350},
  { id: 3, registration: 'VŽ-996-GF', makeYear: '2017', reservoarCapacity: 1350, horsepower: 410},
  { id: 4, registration: 'VŽ-402-UU', makeYear: '2023', reservoarCapacity: 1330, horsepower: 450},
  { id: 5, registration: 'VŽ-252-RR', makeYear: '2022', reservoarCapacity: 1500, horsepower: 520},
  { id: 6, registration: 'VŽ-393-OL', makeYear: '2019', reservoarCapacity: 1420, horsepower: 480},
  { id: 7, registration: 'VŽ-999-IH', makeYear: '2017', reservoarCapacity: 1200, horsepower: 350},
  { id: 8, registration: 'VŽ-996-GF', makeYear: '2017', reservoarCapacity: 1350, horsepower: 410},
  { id: 9, registration: 'VŽ-402-UU', makeYear: '2023', reservoarCapacity: 1330, horsepower: 450},
  { id: 10, registration: 'VŽ-252-RR', makeYear: '2022', reservoarCapacity: 1500, horsepower: 520},
];


const TruckList = () => {
  const [alignment, setAlignment] = React.useState('web');
  const navigate = useNavigate();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', margin: '30px'}}>
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
      </div>

      <div style={{ minHeight: '50%', display: 'flex', justifyContent: 'center'}}>
        <div style={{margin: '20px', minWidth: '80%'}}>
          <DataGrid
            rows={DUMMY_TRUCKS}
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
      </div>
    </>
  );
};

export default TruckList;


