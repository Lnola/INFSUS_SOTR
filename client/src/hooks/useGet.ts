import useFetch, { BaseProps } from './useFetch';

export function useGet<T>({ path, params, start }: BaseProps) {
  return useFetch<T>({ method: 'GET', path, params, start });
}
