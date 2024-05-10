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
      new Order(
        '34d2608e-7ad9-46ed-80a0-45fee0ee486d',
        1500.0,
        1200.0,
        trucks[0],
        trailers[0],
        companies[0],
        statuses[0],
      ),
      new Order(
        'd355834c-5bda-4b38-97d1-321d0429e7c3',
        1011.0,
        800.0,
        trucks[0],
        trailers[1],
        companies[0],
        statuses[0],
      ),
      new Order(
        'ddf0c706-2cf4-4d09-b046-e03bd270e48c',
        1100.0,
        231.0,
        trucks[1],
        trailers[1],
        companies[0],
        statuses[1],
      ),
      new Order(
        'f93c7f8f-92a6-4275-9df8-6402b9dc76d1',
        1400.0,
        432.0,
        trucks[1],
        trailers[0],
        companies[1],
        statuses[1],
      ),
      new Order(
        '29a37a2e-db3b-4e65-9891-22e4c0822391',
        1060.0,
        656.0,
        trucks[1],
        trailers[0],
        companies[1],
        statuses[2],
      ),
      new Order(
        '7008a1d5-c3a2-4dec-8e40-13bc7b9f22be',
        1700.0,
        1222.0,
        trucks[1],
        trailers[1],
        companies[0],
        statuses[2],
      ),
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
