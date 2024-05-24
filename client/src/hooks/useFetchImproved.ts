import { AxiosError } from 'axios';
import { useState } from 'react';
import { extractData } from '@/api/helpers';
import request from '@/api/request';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Props = {
  method: Method;
  path: string;
};

const useFetchImproved = ({ method, path }: Props) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = async () => {
    try {
      setIsLoading(true);
      const response = await request[method.toLowerCase()](path).then(extractData);
      setData(response);
    } catch (error) {
      if (error instanceof AxiosError) setError(error.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetch, data, isLoading, error };
};

export default useFetchImproved;
