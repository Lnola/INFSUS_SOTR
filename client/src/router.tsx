import { createBrowserRouter } from 'react-router-dom';
import OrderPage from './pages/order';
import Driver from '@/pages/driver';
import OrderDetailPage from '@/pages/order-detail';
import TrailerList from '@/pages/trailer';
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
  {
    path: '/trailers',
    element: <TrailerList />,
  },
  {
    path: '/orders',
    element: <OrderPage />,
  },
  {
    path: '/orders/:id',
    element: <OrderDetailPage />,
  },
]);
