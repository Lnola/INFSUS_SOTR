import useFetch, { BaseProps } from './useFetch';

export function useGet<T>({ path, params }: BaseProps) {
  return useFetch<T>({ method: 'GET', path, params });
}
