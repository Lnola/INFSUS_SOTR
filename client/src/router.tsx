import { createBrowserRouter } from 'react-router-dom';
import DriverList from '@/pages/driver';
import TruckList from '@/pages/truck';

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
