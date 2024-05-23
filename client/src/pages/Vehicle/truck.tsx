type Truck = {
  id: number;
  registration: string;
  makeYear: string;
  reservoarCapacity: number;
  horsepower: number;
};

const DUMMY_TRUCKS: Truck[] = [
  { id: 1, registration: 'VŽ-393-OL', makeYear: '2019', reservoarCapacity: 1420, horsepower: 480 },
  { id: 2, registration: 'VŽ-999-IH', makeYear: '2017', reservoarCapacity: 1200, horsepower: 350 },
  { id: 3, registration: 'VŽ-996-GF', makeYear: '2017', reservoarCapacity: 1350, horsepower: 410 },
  { id: 4, registration: 'VŽ-402-UU', makeYear: '2023', reservoarCapacity: 1330, horsepower: 450 },
  { id: 5, registration: 'VŽ-252-RR', makeYear: '2022', reservoarCapacity: 1500, horsepower: 520 },
];


const TruckList = () => {
  return (
    <div>
      {DUMMY_TRUCKS.map(truck => (
        <p key={truck.id}>Id: {truck.id}, Reg: {truck.registration}, Year: {truck.makeYear},
        Reservoar: {truck.reservoarCapacity}L, HP: {truck.horsepower}</p>
      ))}
    </div>
  );
};

export default TruckList;


