import urljoin from 'url-join';
import request from './request';

const base = urljoin('/api/drivers');
const get = base;
const create = base;
const update = (id: number) => urljoin(base, id.toString());
const remove = (id: number) => urljoin(base, id.toString());

export default { get, create, update, remove };

export const removeDriver = async (id: number) => {
  return request.delete(remove(id));
};
