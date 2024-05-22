import { useState } from 'react';

export type PaginationParams = {
  page?: number;
  pageSize?: number;
};

const usePagination = () => {
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({ page: 0, pageSize: 1 });

  const handlePaginationModelChange = (params: PaginationParams) => {
    setPaginationParams(params);
  };

  return { paginationParams, handlePaginationModelChange };
};

export default usePagination;
