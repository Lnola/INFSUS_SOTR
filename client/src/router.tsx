import { createBrowserRouter } from 'react-router-dom';
import DriverList from '@/pages/Driver';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DriverList />,
  },
]);
