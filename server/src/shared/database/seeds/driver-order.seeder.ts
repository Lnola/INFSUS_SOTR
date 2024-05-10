import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Driver from 'driver/entities/driver.entity';
import DriverOrder from 'driver-order/entities/driver-order.entity';
import Order from 'order/entities/order.entity';

export class DriverOrderSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const drivers = await this.getDrivers(em);
    const orders = await this.getOrders(em);
    const driverOrders = [
      new DriverOrder(drivers[0], orders[0]),
      new DriverOrder(drivers[1], orders[0]),
      new DriverOrder(drivers[0], orders[1]),
      new DriverOrder(drivers[1], orders[1]),
    ];
    await em.persistAndFlush(driverOrders);
  }

  async getDrivers(em: EntityManager) {
    return em.find(Driver, {});
  }

  async getOrders(em: EntityManager) {
    return em.find(Order, {});
  }
}
