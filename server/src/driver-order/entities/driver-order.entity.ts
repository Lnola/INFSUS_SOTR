import { Entity, ManyToOne } from '@mikro-orm/core';
import Driver from 'driver/entities/driver.entity';
import Order from 'order/entities/order.entity';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'driver_order' })
class DriverOrder extends BaseEntity {
  @ManyToOne({ entity: () => Driver, fieldName: 'driver_id' })
  driver: Driver;

  @ManyToOne({ entity: () => Order, fieldName: 'order_id' })
  order: Order;

  constructor(driver: Driver, order: Order) {
    super();
    this.driver = driver;
    this.order = order;
  }
}

export default DriverOrder;
