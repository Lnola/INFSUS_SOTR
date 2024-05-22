import useFetch, { FetchReturn, BaseProps } from './useFetch';

export function useGet<T>({ path, query }: BaseProps): FetchReturn<T> {
  return useFetch<T>({ path, method: 'GET', query: query || {} });
}
