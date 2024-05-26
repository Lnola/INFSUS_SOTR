import { Autocomplete, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import companyLocation from '@/api/company-location';
import FormDialog from '@/components/common/FormDialog';
import { useGet } from '@/hooks/useGet';
import CompanyLocation from '@/models/company-location';
import LogisticsOperation from '@/models/logistics-operation';

const validate = formData => {
  let isValid = true;
  if (!['1', '2'].includes(formData.type) && ![1, 2].includes(formData.type)) {
    toast.error('Invalid type!');
    isValid = false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
    toast.error('Invalid date! Accepted format: MM/DD/YYYY');
    isValid = false;
  }

  return isValid;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchOrders: () => void;
  initFormData?: object;
  logOperation?: LogisticsOperation;
  orderId: number;
  onChangeRerender: boolean;
  setOnChangeRerender: (set: boolean) => void;
};

const LogisticsOperationAdd = ({
  isOpen,
  setIsOpen,
  refetchOrders,
  logOperation,
  orderId,
  onChangeRerender,
  setOnChangeRerender,
}: Props) => {
  const initialFormData = {
    date: '',
    isCompleted: false,
    note: '',
    companyLocation: 0,
    type: '',
    order: orderId,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [wasFetched, setWasFetched] = useState(false);

  const { data: companyLocations } = useGet<CompanyLocation[]>({ path: companyLocation.getAll });

  useEffect(() => {
    if (logOperation) {
      const formattedDate = new Date(logOperation.date).toISOString().split('T')[0];
      setFormData({
        date: formattedDate || '',
        isCompleted: logOperation?.isCompleted ?? false,
        note: logOperation?.note || '',
        companyLocation: logOperation?.companyLocation || 0,
        type: logOperation?.type.toString() || '',
        order: logOperation?.order,
      });
    }
  }, [logOperation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || !validate(formData)) return;
    setWasFetched(true);
    const response = await fetch(`/api/logistics-operations/${!logOperation ? '' : logOperation?.id}`, {
      method: !logOperation ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData }),
    });

    if (response.ok) {
      toast.success('Task successful!');
      setIsOpen(false);
      refetchOrders();
      setOnChangeRerender(!onChangeRerender);
    } else {
      toast.error('Task not successful!');
    }
  };

  useEffect(() => {}, [wasFetched]);

  if (!companyLocations) return null;
  return (
    <FormDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Add Order" handleSubmit={handleSubmit}>
      <TextField
        required
        name="date"
        label="Date"
        variant="standard"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.date}
        onChange={handleChange}
      />
      <Autocomplete
        disablePortal
        value={formData.isCompleted}
        onChange={(_, value) => setFormData(prev => ({ ...prev, isCompleted: value ?? false }))}
        options={[true, false]}
        getOptionLabel={option => (option ? 'True' : 'False')}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={params => <TextField {...params} label="Is Completed?" variant="standard" />}
      />
      <TextField
        name="note"
        label="Note"
        variant="standard"
        type="text"
        value={formData.note}
        onChange={handleChange}
      />
      <Autocomplete
        disablePortal
        value={companyLocations.find(loc => loc.id === formData.companyLocation) || null}
        onChange={(_, value) => setFormData(prev => ({ ...prev, companyLocation: value?.id || 0 }))}
        options={companyLocations || []}
        getOptionLabel={option => option.name}
        renderInput={params => <TextField {...params} label="Company Location" variant="standard" />}
      />
      <TextField
        required
        name="type"
        label="Type"
        variant="standard"
        select
        value={formData.type}
        onChange={handleChange}
      >
        <MenuItem value={1}>Loading</MenuItem>
        <MenuItem value={2}>Unloading</MenuItem>
      </TextField>
      <TextField
        required
        name="order"
        label="Order"
        variant="standard"
        type="number"
        value={formData.order}
        onChange={handleChange}
      />
    </FormDialog>
  );
};

export default LogisticsOperationAdd;
