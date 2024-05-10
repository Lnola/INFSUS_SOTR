import { Entity, Property, Unique, ManyToOne, OneToMany, Collection } from '@mikro-orm/core';
import Company from 'company/entities/company.entity';
import DriverOrder from 'driver-order/entities/driver-order.entity';
import LogisticsOperation from 'logistics-operation/entities/logistics-operation.entity';
import BaseEntity from 'shared/database/base.entity';
import Trailer from 'trailer/entities/trailer.entity';
import Truck from 'truck/entities/truck.entity';
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

  @ManyToOne({ entity: () => Truck, fieldName: 'truck_id' })
  truck: Truck;

  @ManyToOne({ entity: () => Trailer, fieldName: 'trailer_id' })
  trailer: Trailer;

  @ManyToOne({ entity: () => Company, fieldName: 'company_id' })
  financer: Company;

  @ManyToOne({ entity: () => OrderStatus, fieldName: 'status_id' })
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
    financer: Company,
    status: OrderStatus,
  ) {
    super();
    this.serialNumber = serialNumber;
    this.transportPrice = transportPrice;
    this.distance = distance;
    this.truck = truck;
    this.trailer = trailer;
    this.financer = financer;
    this.status = status;
  }
}

export default Order;
