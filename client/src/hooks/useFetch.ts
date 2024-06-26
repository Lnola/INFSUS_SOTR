import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { extractData } from '@/api/helpers';
import request from '@/api/request';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type PaginationParams = {
  page: number;
  pageSize: number;
};

export type BaseProps = {
  path: string;
  params?: PaginationParams | object;
  start?: boolean;
};

type Props = BaseProps & {
  method: Method;
};

const useFetch = <T>({ method, path, params, start = true }: Props) => {
  const [data, setData] = useState<T | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      setData(null);
      setError(null);
      const response = await request[method.toLowerCase()](path, { params }).then(extractData);
      setData(response);
    } catch (error) {
      if (error instanceof AxiosError) setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, path, params]);

  useEffect(() => {
    if (!start) return;
    fetch();
  }, [start, fetch]);

  return { fetch, data, isLoading, error };
};

export default useFetch;
