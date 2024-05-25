import { createBrowserRouter } from 'react-router-dom';
import DriverList from '@/pages/driver';
import TrailerList from '@/pages/trailer';
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
  {
    path: '/trailers',
    element: <TrailerList />,
  },
]);
