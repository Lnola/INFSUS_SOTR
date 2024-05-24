import { createBrowserRouter } from 'react-router-dom';
import TruckList from './pages/Truck';
import DriverList from '@/pages/Driver';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DriverList />,
  },
  {
    path: '/trucks',
    element: <TruckList />,
  },
]);
