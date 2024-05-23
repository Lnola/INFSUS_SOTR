import { createBrowserRouter } from 'react-router-dom';
import TruckList from './pages/Vehicle/truck';
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
