import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useRef, useState } from 'react';
import { driverUrls } from '@/api';
import { PaginatedResponse } from '@/api/helpers';
import Error from '@/components/common/Error';
import { useGet } from '@/hooks/useGet';
import Driver from '@/models/driver';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'contactNumber', headerName: 'Contact Number', width: 130 },
  { field: 'employmentStartDate', headerName: 'Employment Start Date', width: 130, type: 'string' },
  { field: 'employmentEndDate', headerName: 'Employment End Date', width: 130, type: 'string' },
];

const DriverList = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 1,
  });
  const { data, isLoading, error } = useGet<PaginatedResponse<Driver[]>>({
    path: driverUrls.getAll,
    params: paginationModel,
  });

  const rowCountRef = useRef(data?.count || 0);

  const rowCount = useMemo(() => {
    if (data?.count !== undefined) {
      rowCountRef.current = data.count;
    }
    return rowCountRef.current;
  }, [data?.count]);

  if (error) return <Error error={error || 'Missing data'} />;
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={data?.items || []}
        rowCount={rowCount}
        loading={isLoading}
        pageSizeOptions={[1, 5, 10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
};

export default DriverList;
