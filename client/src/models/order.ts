import Company from './company';
import Trailer from './trailer';
import Truck from './truck';

export type OrderStatus = {
  id: number;
  name: string;
};

type Order = {
  id: number;
  serialNumber: string;
  transportPrice: number;
  distance: number;
  truck: Truck;
  trailer: Trailer;
  financer: Company;
  status: OrderStatus;
};

export default Order;
