import { useMemo, useRef, useState } from 'react';
import { useGet } from './useGet';
import { PaginatedResponse } from '@/api/helpers';

const usePagination = <T>(path: string) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  const { fetch, data, isLoading, error } = useGet<PaginatedResponse<T>>({ path, params: paginationModel });

  const countRef = useRef(data?.count || 0);
  const count = useMemo(() => {
    if (data?.count) countRef.current = data.count;
    return countRef.current;
  }, [data?.count]);

  return { fetch, data: data?.items, count, isLoading, error, paginationModel, setPaginationModel };
};

export default usePagination;
