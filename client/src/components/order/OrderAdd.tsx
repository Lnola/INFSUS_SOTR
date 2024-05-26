import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import company from '@/api/company';
import { PaginatedResponse } from '@/api/helpers';
import { urls as orderUrls } from '@/api/order';
import trailer from '@/api/trailer';
import truck from '@/api/truck';
import FormDialog from '@/components/common/FormDialog';
import useFetch from '@/hooks/useFetch';
import { useGet } from '@/hooks/useGet';
import Company from '@/models/company';
import Order, { OrderStatus } from '@/models/order';
import Trailer from '@/models/trailer';
import Truck from '@/models/truck';

const validate = (formData, setFormData) => {
  let isValid = true;
  if (typeof formData.transportPrice === 'string') {
    setFormData(prev => ({ ...prev, transportPrice: +formData.transportPrice }));
  } else if (formData.transportPrice < 0) {
    isValid = false;
  }

  if (typeof formData.distance === 'string') {
    setFormData(prev => ({ ...prev, distance: +formData.distance }));
  } else if (formData.distance < 0) {
    isValid = false;
  }

  return isValid;
};

const initialFormData = {
  transportPrice: '',
  distance: '',
  truckRegistration: '',
  trailerRegistration: '',
  financer: '',
  status: '',
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

  const { data: trucks } = useGet<PaginatedResponse<Truck>>({ path: truck.getAll });
  const { data: trailers } = useGet<PaginatedResponse<Trailer>>({ path: trailer.getAll });
  const { data: companies } = useGet<Company[]>({ path: company.getAll });
  const { data: orderStatuses } = useGet<OrderStatus[]>({ path: orderUrls.getOrderStatuses() });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = +event.target.value;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !validate(formData, setFormData)) return;
    setWasFetched(true);
  };

  useEffect(() => {
    if (wasFetched) {
      if (!error) {
        create().then(() => {
          setIsOpen(false);
          refetchOrders();
          toast.success('Success!');
        });
      } else {
        toast.error(`Failed! ${error}`);
      }
    }
  }, [error, wasFetched, setIsOpen, refetchOrders, create]);

  if (!trucks || !trailers || !companies || !orderStatuses) return null;
  return (
    <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Add Order" handleSubmit={handleSubmit}>
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
      <Autocomplete
        disablePortal
        value={formData.truckRegistration}
        onChange={(_, value) => setFormData(prev => ({ ...prev, truckRegistration: value ?? '' }))}
        options={trucks.items?.map(truck => truck.registration) || []}
        renderInput={params => <TextField {...params} label="Truck Registration" variant="standard" />}
      />
      <Autocomplete
        disablePortal
        value={formData.trailerRegistration ?? ''}
        onChange={(_, value) => setFormData(prev => ({ ...prev, trailerRegistration: value ?? '' }))}
        options={trailers.items?.map(trailer => trailer.registration) || []}
        renderInput={params => <TextField {...params} label="Trailer Registration" variant="standard" />}
      />
      <Autocomplete
        disablePortal
        value={formData.financer as string}
        onChange={(_, value) => setFormData(prev => ({ ...prev, financer: value ?? '' }))}
        options={companies.map(company => company.name) || []}
        renderInput={params => <TextField {...params} label="Financer" variant="standard" />}
      />
      <Autocomplete
        disablePortal
        value={formData.status as string}
        onChange={(_, value) => setFormData(prev => ({ ...prev, status: value ?? '' }))}
        options={orderStatuses.map(orderStatus => orderStatus.name) || []}
        renderInput={params => <TextField {...params} label="Order Status" variant="standard" />}
      />
    </FormDialog>
  );
};

export default OrderAdd;
