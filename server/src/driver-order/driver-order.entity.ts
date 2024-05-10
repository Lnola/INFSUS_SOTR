import { Entity, ManyToOne } from '@mikro-orm/core';
import Driver from 'driver/driver.entity';
import Order from 'order/order.entity';
import BaseEntity from 'shared/database/base.entity';

@Entity({ tableName: 'driver_order' })
class DriverOrder extends BaseEntity {
  @ManyToOne(() => Driver)
  driver: Driver;

  @ManyToOne(() => Order)
  order: Order;

  constructor(driver: Driver, order: Order) {
    super();
    this.driver = driver;
    this.order = order;
  }
}

export default DriverOrder;