import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { PaginationParams } from './usePagination';

type MethodLowercase = 'get' | 'post' | 'delete' | 'put';
export type BaseProps = {
  path: string;
  query?: object & PaginationParams;
};
export type GetProps = {
  method: 'GET';
  data?: never;
};
export type PostProps = {
  method: 'POST' | 'DELETE' | 'PUT';
  data: object;
};
type ConditionalProps = GetProps | PostProps;
type Props = BaseProps & ConditionalProps;
export type FetchReturn<T> = {
  data: T | undefined;
  count: number | undefined;
  isLoading: boolean;
  refetch: (paginationParams?: PaginationParams) => void;
  error: Error | null;
};

function useFetch<T>({ path, method, data, query }: Props): FetchReturn<T> {
  const [result, setResult] = useState<T>();
  const [count, setCount] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (paginationParams?: PaginationParams) => {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const request = axios.create(config);

      console.log({ ...data, ...query, ...paginationParams });
      const lowercaseMethod = method.toLowerCase() as MethodLowercase;
      return await request[lowercaseMethod](path, { params: { ...data, ...query, ...paginationParams } });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, method, path],
  );

  const fetchAndFormat = useCallback(
    async (paginationParams?: PaginationParams) => {
      try {
        const response = await fetchData(paginationParams);
        const data = await response.data;
        setCount(data.count);
        setResult(data.items);
        setError(null);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axiosError = error as any;
        setError(axiosError.response?.data || axiosError);
      } finally {
        setIsLoading(false);
        setInternalLoading(false);
      }
    },
    [fetchData],
  );

  const fetchEnsureSingleActive = useCallback(
    async (paginationParams?: PaginationParams) => {
      if (internalLoading) {
        return;
      }
      setInternalLoading(true);
      setIsLoading(true);
      await fetchAndFormat(paginationParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetchAndFormat],
  );

  useEffect(() => {
    fetchEnsureSingleActive();
  }, [fetchEnsureSingleActive]);

  const refetch = (paginationParams?: PaginationParams) => {
    fetchEnsureSingleActive(paginationParams);
  };

  return { data: result, count, isLoading, error, refetch };
}

export default useFetch;
