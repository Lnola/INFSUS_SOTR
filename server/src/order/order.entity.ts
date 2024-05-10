import { Entity, Property, Unique, ManyToOne } from '@mikro-orm/core';
import Company from 'company/company.entity';
import BaseEntity from 'shared/database/base.entity';
import Trailer from 'trailer/trailer.entity';
import Truck from 'truck/truck.entity';
import OrderStatus from './order-status.entity';

@Entity({ tableName: 'order' })
class Order extends BaseEntity {
  @Property()
  @Unique()
  serialNumber: string;

  @Property()
  transportPrice: number;

  @Property()
  distance: number;

  @ManyToOne(() => Truck)
  truck: Truck;

  @ManyToOne(() => Trailer)
  trailer: Trailer;

  @ManyToOne(() => Company)
  company: Company;

  @ManyToOne(() => OrderStatus)
  status: OrderStatus;

  constructor(
    serialNumber: string,
    transportPrice: number,
    distance: number,
    truck: Truck,
    trailer: Trailer,
    company: Company,
    status: OrderStatus,
  ) {
    super();
    this.serialNumber = serialNumber;
    this.transportPrice = transportPrice;
    this.distance = distance;
    this.truck = truck;
    this.trailer = trailer;
    this.company = company;
    this.status = status;
  }
}

export default Order;
