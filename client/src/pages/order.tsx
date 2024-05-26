import { Button } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { urls as orderUrls, removeOrder } from '@/api/order';
import OrderAdd from '@/components/order/OrderAdd';
import OrderList from '@/components/order/OrderList';
import usePagination from '@/hooks/usePagination';
import Order from '@/models/order';

const OrderPage = () => {
  const { fetch, ...paginationProps } = usePagination<Order[]>(orderUrls.get());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [order, setOrder] = useState<Order>();

  const handleEdit = (order: Order) => {
    setOrder(order);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await removeOrder(id);
      toast.success('Order deleted');
      fetch();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>
        Add Order
      </Button>
      <OrderList {...paginationProps} handleEdit={handleEdit} handleDelete={handleDelete} />
      {isAddDialogOpen && (
        <OrderAdd isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} refetchOrders={fetch} order={order} />
      )}
    </>
  );
};

export default OrderPage;
