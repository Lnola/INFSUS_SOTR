import useFetch, { BaseProps } from './useFetch';

export function usePost<T>({ path, params, start }: BaseProps) {
  return useFetch<T>({ method: 'POST', path, params, start });
}
