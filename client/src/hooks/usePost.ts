import useFetch, { BaseProps } from './useFetch';

export function usePost<T>({ path, params }: BaseProps) {
  return useFetch<T>({ method: 'POST', path, params });
}
