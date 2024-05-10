import { Entity, Property, Unique, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import Company from 'company/company.entity';
import DriverOrder from 'driver-order/driver-order.entity';
import LogisticsOperation from 'logistics-operation/logistics-operation.entity';
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

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => DriverOrder,
    mappedBy: (it: DriverOrder) => it.order,
    orphanRemoval: true,
    eager: false,
  })
  _driverOrders = new Collection<DriverOrder>(this);

  // TODO: decide if it needs to be private and eager
  @OneToMany({
    entity: () => LogisticsOperation,
    mappedBy: (it: LogisticsOperation) => it.order,
    orphanRemoval: true,
    eager: false,
  })
  _logisticsOperations = new Collection<LogisticsOperation>(this);

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
