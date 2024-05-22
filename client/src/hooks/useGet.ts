import useFetch, { FetchReturn, BaseProps, Query } from './useFetch';

export function useGet<T>({ path }: BaseProps, query?: Query): FetchReturn<T> {
  return useFetch<T>({ path, method: 'GET', query: query || {} });
}
