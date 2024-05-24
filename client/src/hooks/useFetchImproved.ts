import { AxiosError } from 'axios';
import { extractData } from '@/api/helpers';
import request from '@/api/request';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Props = {
  method: Method;
  path: string;
};

const useFetchImproved = ({ method, path }: Props) => {
  const fetch = async () => {
    try {
      const response = await request[method.toLowerCase()](path).then(extractData);
      console.log(response);
    } catch (error) {
      if (error instanceof AxiosError) console.log(error.response?.data.message);
    }
  };

  return { fetch };
};

export default useFetchImproved;
