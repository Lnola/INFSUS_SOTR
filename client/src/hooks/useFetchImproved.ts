import { AxiosError } from 'axios';
import { useState } from 'react';
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

  const setValues = ({ data, error }: { data?: T; error?: string }) => {
    setData(data || null);
    setError(error || null);
  };

  const fetch = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      const response = await request[method.toLowerCase()](path).then(extractData);
      setValues({ data: response });
    } catch (error) {
      if (error instanceof AxiosError) setValues({ error: error.response?.data.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { fetch, data, isLoading, error };
};

export default useFetchImproved;
