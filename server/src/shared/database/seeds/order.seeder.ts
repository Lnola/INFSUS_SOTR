import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Company from 'company/entities/company.entity';
import OrderStatus from 'order/entities/order-status.entity';
import Order from 'order/entities/order.entity';
import Trailer from 'trailer/entities/trailer.entity';
import Truck from 'truck/entities/truck.entity';

export class OrderSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const statuses = [new OrderStatus('U tijeku'), new OrderStatus('Odrađen'), new OrderStatus('Fakturiran')];

    const trucks = await this.getTrucks(em);
    const trailers = await this.getTrailers(em);
    const companies = await this.getCompanies(em);
    const orders = [
      new Order(1500.0, 1200.0, trucks[0], trailers[0], companies[0], statuses[0]),
      new Order(1011.0, 800.0, trucks[0], trailers[1], companies[0], statuses[0]),
      new Order(1100.0, 231.0, trucks[1], trailers[1], companies[0], statuses[1]),
      new Order(1400.0, 432.0, trucks[1], trailers[0], companies[1], statuses[1]),
      new Order(1060.0, 656.0, trucks[1], trailers[0], companies[1], statuses[2]),
      new Order(1700.0, 1222.0, trucks[1], trailers[1], companies[0], statuses[2]),
    ];

    await em.persistAndFlush([...statuses, ...orders]);
  }

  async getTrucks(em: EntityManager) {
    return em.find(Truck, {});
  }

  async getTrailers(em: EntityManager) {
    return em.find(Trailer, {});
  }

  async getCompanies(em: EntityManager) {
    return em.find(Company, {});
  }
}
