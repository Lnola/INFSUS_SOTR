import { useCallback, useEffect, useState } from 'react';
import { PaginationParams } from './usePagination';

export type BaseProps = {
  path: string;
  query?: object;
};
export type Query = object[] & PaginationParams;
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
  isLoading: boolean;
  refresh: () => void;
  error: Error | null;
};

function useFetch<T>({ path, method, data, query }: Props): FetchReturn<T> {
  const [result, setResult] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    const response = await fetch(path, {
      headers: data === undefined ? {} : { 'Content-Type': 'application/json' },
      body: data === undefined ? null : JSON.stringify(data),
      method,
    });
    return response;
  }, [data, method, path]);

  const fetchAndFormat = useCallback(async () => {
    try {
      const response = await fetchData();
      const data = JSON.parse(await response.text());
      if (!response.ok) throw new Error(data.message);
      setResult(data);
      setError(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
      setInternalLoading(false);
    }
  }, [fetchData]);

  const fetchEnsureSingleActive = useCallback(async () => {
    if (internalLoading) {
      return;
    }
    setInternalLoading(true);
    setIsLoading(true);
    await fetchAndFormat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAndFormat]);

  useEffect(() => {
    fetchEnsureSingleActive();
  }, [fetchEnsureSingleActive]);

  const refresh = () => {
    fetchEnsureSingleActive();
  };

  return { data: result, isLoading, error, refresh };
}

export default useFetch;
