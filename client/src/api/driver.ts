import urljoin from 'url-join';
import request from './request';

const base = urljoin('/api/drivers');
const get = base;
const create = base;
const remove = (id: number) => urljoin(base, id.toString());

export default { get, create, remove };

export const removeDriver = async (id: number) => {
  return request.delete(remove(id));
};
