import useFetchImproved, { BaseProps } from './useFetchImproved';

export function useGet<T>({ path, params }: BaseProps) {
  return useFetchImproved<T>({ method: 'GET', path, params });
}
