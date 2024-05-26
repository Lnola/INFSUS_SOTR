import styled from '@emotion/styled';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StyledForm } from '../common/styled/StyledModal';
import company from '@/api/company';
import { PaginatedResponse } from '@/api/helpers';
import { urls as orderUrls } from '@/api/order';
import trailer from '@/api/trailer';
import truck from '@/api/truck';
import useFetch from '@/hooks/useFetch';
import { useGet } from '@/hooks/useGet';
import Company from '@/models/company';
import Order, { OrderStatus } from '@/models/order';
import Trailer from '@/models/trailer';
import Truck from '@/models/truck';

const FormTextField = styled(TextField)`
  width: 100%;
`;
const FormElement = styled.div`
  width: 250px;
  margin-bottom: 16px;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 40px;
`;

const MasterActions = ({ id, handleDelete }) => {
  const handle = () => {
    handleDelete(id);
  };

  return (
    <StyledButtonContainer>
      <Button type="submit" variant="contained" color="success">
        Save changes
      </Button>
      <Button type="button" variant="outlined" color="error" onClick={handle}>
        Delete
      </Button>
    </StyledButtonContainer>
  );
};

const validate = (formData, setFormData) => {
  let isValid = true;
  if (typeof formData.transportPrice === 'string') {
    setFormData(prev => ({ ...prev, transportPrice: +formData.transportPrice }));
  } else if (formData.transportPrice < 0) {
    toast.error('No negative price values.');
    isValid = false;
  }
  if (formData.trailerRegistration == '' || formData.truckRegistration == '') {
    toast.error('Truck and trailer registrations are required.');
    isValid = false;
  }
  if (typeof formData.distance === 'string') {
    setFormData(prev => ({ ...prev, distance: +formData.distance }));
  } else if (formData.distance < 0) {
    toast.error('No negative distance values.');
    isValid = false;
  }

  return isValid;
};

type Props = {
  refetchOrders: () => void;
  order?: Order;
};

const OrderUpdate = ({ refetchOrders, order }: Props) => {
  const [formData, setFormData] = useState({
    transportPrice: order?.transportPrice,
    distance: order?.distance,
    truckRegistration: order?.truck.registration,
    trailerRegistration: order?.trailer.registration,
    financer: order?.financer.name,
    status: order?.status.name,
    id: order?.id,
    serialNumber: order?.serialNumber,
    truck: order?.truck,
    trailer: order?.trailer,
  });
  const { fetch: create, error } = useFetch<any>({
    method: !order ? 'POST' : 'PUT',
    path: !order || !order.id ? orderUrls.create() : orderUrls.update(order.id!),
    params: { ...formData },
    start: false,
  });
  const [wasFetched, setWasFetched] = useState(false);
  const navigate = useNavigate();

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
    //console.log("Handle submit");
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !validate(formData, setFormData)) return;
    setWasFetched(true);
  };

  const handleDelete = async (id: number) => {
    //const response = await fetch(`/api/logistics-operations/${id}`, {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      navigate('/orders');
      toast.success('Success!');
    } else {
      toast.error(`Failed! ${error}`);
    }
  };

  useEffect(() => {
    if (wasFetched) {
      if (!error) {
        create().then(() => {
          refetchOrders();
          toast.success('Success!');
        });
      } else {
        toast.error(`Failed! ${error}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasFetched]);

  if (!trucks || !trailers || !companies || !orderStatuses) return null;
  return (
    <StyledForm style={{ width: '100%' }} onSubmit={handleSubmit}>
      <FormElement>
        <FormTextField
          required
          name="transportPrice"
          label="Transport Price"
          variant="standard"
          type="number"
          value={formData.transportPrice}
          onChange={handleChange}
        />
      </FormElement>
      <FormElement>
        <FormTextField
          required
          name="distance"
          label="Distance"
          variant="standard"
          type="number"
          value={formData.distance}
          onChange={handleChange}
        />
      </FormElement>
      <FormElement>
        <Autocomplete
          disablePortal
          value={formData.truckRegistration}
          onChange={(_, value) => setFormData(prev => ({ ...prev, truckRegistration: value ?? '' }))}
          options={trucks.items?.map(truck => truck.registration) || []}
          renderInput={params => <FormTextField {...params} label="Truck Registration" variant="standard" />}
        />
      </FormElement>
      <FormElement>
        <Autocomplete
          disablePortal
          value={formData.trailerRegistration ?? ''}
          onChange={(_, value) => setFormData(prev => ({ ...prev, trailerRegistration: value ?? '' }))}
          options={trailers.items?.map(trailer => trailer.registration) || []}
          renderInput={params => <FormTextField {...params} label="Trailer Registration" variant="standard" />}
        />
      </FormElement>
      <FormElement>
        <Autocomplete
          disablePortal
          value={formData.financer ?? ''}
          onChange={(_, value) => setFormData(prev => ({ ...prev, financer: value ?? '' }))}
          options={companies.map(company => company.name) || []}
          renderInput={params => <FormTextField {...params} label="Financer" variant="standard" />}
        />
      </FormElement>
      <FormElement>
        <Autocomplete
          disablePortal
          value={formData.status as string}
          onChange={(_, value) => setFormData(prev => ({ ...prev, status: value ?? '' }))}
          options={orderStatuses.map(orderStatus => orderStatus.name) || []}
          renderInput={params => <FormTextField {...params} label="Order Status" variant="standard" />}
        />
      </FormElement>
      <MasterActions id={order?.id} handleDelete={handleDelete} />
    </StyledForm>
  );
};

export default OrderUpdate;
