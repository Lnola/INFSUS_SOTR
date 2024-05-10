import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import CompanyLocation from 'company-location/company-location.entity';
import Order from 'order/order.entity';
import BaseEntity from 'shared/database/base.entity';
import LogisticsOperationType from './logistics-operation-type.entity';

@Entity({ tableName: 'logistics_operation' })
class LogisticsOperation extends BaseEntity {
  @Property()
  date: Date;

  @Property()
  isCompleted: boolean;

  @Property({ nullable: true })
  note: string;

  @ManyToOne(() => CompanyLocation)
  companyLocation: CompanyLocation;

  @ManyToOne(() => LogisticsOperationType)
  type: LogisticsOperationType;

  @ManyToOne(() => Order)
  order: Order;

  constructor(
    date: Date,
    isCompleted: boolean,
    note: string,
    companyLocation: CompanyLocation,
    type: LogisticsOperationType,
    order: Order,
  ) {
    super();
    this.date = date;
    this.isCompleted = isCompleted;
    this.note = note;
    this.companyLocation = companyLocation;
    this.type = type;
    this.order = order;
  }
}

export default LogisticsOperation;
