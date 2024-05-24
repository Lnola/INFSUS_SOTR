import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { extractData } from '@/api/helpers';
import request from '@/api/request';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Props = {
  method: Method;
  path: string;
};

const useFetchImproved = <T>({ method, path }: Props) => {
  const [data, setData] = useState<T | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      setData(null);
      setError(null);
      const response = await request[method.toLowerCase()](path).then(extractData);
      setData(response);
    } catch (error) {
      if (error instanceof AxiosError) setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, path]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { fetch, data, isLoading, error };
};

export default useFetchImproved;
