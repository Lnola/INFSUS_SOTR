import { AxiosResponse } from 'axios';

export type PaginatedResponse<T> = {
  items: T[];
  count: number;
};

export const extractData = (response: AxiosResponse) => response.data;
