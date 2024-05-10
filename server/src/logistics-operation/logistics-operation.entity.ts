import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import CompanyLocation from 'company-location/entities/company-location.entity';
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

  @ManyToOne({ entity: () => CompanyLocation, fieldName: 'company_location_id' })
  companyLocation: CompanyLocation;

  @ManyToOne({ entity: () => LogisticsOperationType, fieldName: 'type_id' })
  type: LogisticsOperationType;

  @ManyToOne({ entity: () => Order, fieldName: 'order_id' })
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
