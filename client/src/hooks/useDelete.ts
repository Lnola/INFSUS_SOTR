import useFetch, { BaseProps } from './useFetch';

export function useDelete<T>({ path, start }: BaseProps) {
  return useFetch<T>({ method: 'DELETE', path, start });
}
