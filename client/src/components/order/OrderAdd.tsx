import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { urls as orderUrls } from '@/api/order';
import FormDialog from '@/components/common/FormDialog';
import useFetch from '@/hooks/useFetch';
import Order from '@/models/order';

const validate = (formData, setFormData) => {
  const isValid = true;
  console.log(formData, setFormData);
  return isValid;
};

const initialFormData = {
  serialNumber: '',
  serialNumberError: '',
  transportPrice: 0,
  transportPriceError: '',
  distance: 0,
  distanceError: '',
  // truck: Truck,
  // trailer: Trailer,
  // financer: Company,
  // status: OrderStatus,
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchOrders: () => void;
  initFormData?: typeof initialFormData;
  order?: Order;
};

const OrderAdd = ({ isOpen, setIsOpen, refetchOrders, order }: Props) => {
  const [formData, setFormData] = useState({ ...initialFormData, ...order });
  const { fetch: create, error } = useFetch<any>({
    method: !order ? 'POST' : 'PUT',
    path: !order || !order.id ? orderUrls.create() : orderUrls.update(order.id!),
    params: { ...formData },
    start: false,
  });
  const [wasFetched, setWasFetched] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !validate(formData, setFormData)) return;
    await create();
    setWasFetched(true);
  };

  useEffect(() => {
    if (wasFetched) {
      if (!error) {
        setIsOpen(false);
        refetchOrders();
        toast.success('Success!');
      } else {
        toast.error(`Failed! ${error}`);
      }
    }
  }, [error, wasFetched, setIsOpen, refetchOrders]);

  return (
    <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Add Order" handleSubmit={handleSubmit}>
      <TextField
        required
        name="serialNumber"
        label="Serial Number"
        variant="standard"
        value={formData.serialNumber}
        onChange={handleChange}
      />
      <TextField
        required
        name="transportPrice"
        label="Transport Price"
        variant="standard"
        type="number"
        value={formData.transportPrice}
        onChange={handleChange}
      />
      <TextField
        required
        name="distance"
        label="Distance"
        variant="standard"
        type="number"
        value={formData.distance}
        onChange={handleChange}
      />
    </FormDialog>
  );
};

export default OrderAdd;
