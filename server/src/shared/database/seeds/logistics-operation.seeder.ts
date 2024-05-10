import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import CompanyLocation from 'company-location/company-location.entity';
import LogisticsOperationType from 'logistics-operation/logistics-operation-type.entity';
import LogisticsOperation from 'logistics-operation/logistics-operation.entity';
import Order from 'order/order.entity';

export class LogisticsOperationSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const operationTypes = [new LogisticsOperationType('Utovar'), new LogisticsOperationType('Istovar')];

    const locations = this.getLocations(em);
    const orders = this.getOrders(em);
    const operations = [
      new LogisticsOperation(new Date('2023-10-01 14:30:00'), true, null, locations[0], locations[0], orders[0]),
      new LogisticsOperation(new Date('2023-10-02 14:30:00'), false, null, locations[1], locations[1], orders[1]),
      new LogisticsOperation(new Date('2023-10-03 14:30:00'), true, null, locations[0], locations[0], orders[2]),
      new LogisticsOperation(new Date('2023-10-04 14:30:00'), false, null, locations[1], locations[1], orders[3]),
      new LogisticsOperation(new Date('2023-10-05 14:30:00'), true, null, locations[0], locations[0], orders[4]),
      new LogisticsOperation(new Date('2023-10-06 14:30:00'), false, null, locations[1], locations[1], orders[5]),
    ];

    await em.persistAndFlush([...operationTypes, ...operations]);
  }

  async getLocations(em: EntityManager) {
    return em.find(CompanyLocation, {});
  }

  async getOrders(em: EntityManager) {
    return em.find(Order, {});
  }
}
