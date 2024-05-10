import { Entity, Property, Unique } from '@mikro-orm/core';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'order_status' })
class OrderStatus extends BaseEntity {
  @Property()
  @Unique()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export default OrderStatus;
