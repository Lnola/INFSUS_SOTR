import urljoin from 'url-join';
import request from './request';

export const urls = {
  base: '/api/orders',
  get() {
    return this.base;
  },
  create() {
    return this.base;
  },
  update(id: number) {
    return urljoin(this.base, id.toString());
  },
  remove(id: number) {
    return urljoin(this.base, id.toString());
  },
};

export const removeOrder = (id: number) => {
  return request.delete(urls.remove(id));
};
