import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
];

const DUMMY_TRUCKS: Truck[] = [
  { id: 1, registration: 'VŽ-393-OL', makeYear: '2019', reservoarCapacity: 1420, horsepower: 480 },
  { id: 2, registration: 'VŽ-999-IH', makeYear: '2017', reservoarCapacity: 1200, horsepower: 350 },
  { id: 3, registration: 'VŽ-996-GF', makeYear: '2017', reservoarCapacity: 1350, horsepower: 410 },
  { id: 4, registration: 'VŽ-402-UU', makeYear: '2023', reservoarCapacity: 1330, horsepower: 450 },
  { id: 5, registration: 'VŽ-252-RR', makeYear: '2022', reservoarCapacity: 1500, horsepower: 520 },
];


const TruckList = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={DUMMY_TRUCKS}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default TruckList;


