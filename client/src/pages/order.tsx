import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [orderToDeleteId, setOrderToDeleteId] = useState<number | null>();

  const handleEdit = (order: Order) => {
    setOrder(order);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    setConfirmDialogOpen(true);
    setOrderToDeleteId(id);
  };

  const resetConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setOrderToDeleteId(null);
  };

  const confirmDelete = async () => {
    try {
      if (!orderToDeleteId) throw new Error('Order ID is not set');
      await removeOrder(orderToDeleteId);
      toast.success('Order deleted');
      fetch();
    } catch (error) {
      toast.error('Failed to delete order');
    } finally {
      resetConfirmDialog();
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
      {confirmDialogOpen && (
        <Dialog open={confirmDialogOpen} onClose={resetConfirmDialog}>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this order? This action will delete the order permanently along with the
              data depending on the order.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={resetConfirmDialog}>Cancel</Button>
            <Button onClick={confirmDelete}>Continue</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default OrderPage;
