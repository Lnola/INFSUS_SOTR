import { createBrowserRouter } from 'react-router-dom';
import Driver from '@/pages/driver';
import TruckList from '@/pages/truck';

export const router = createBrowserRouter([
  {
    path: '/drivers',
    element: <Driver />,
  },
  {
    path: '/trucks',
    element: <TruckList />,
  },
]);
