import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import CompanyLocation from 'company-location/entities/company-location.entity';
import LogisticsOperationType from 'logistics-operation/entities/logistics-operation-type.entity';
import LogisticsOperation from 'logistics-operation/entities/logistics-operation.entity';
import Order from 'order/entities/order.entity';

export class LogisticsOperationSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const operationTypes = [new LogisticsOperationType('Utovar'), new LogisticsOperationType('Istovar')];

    const locations = await this.getLocations(em);
    const orders = await this.getOrders(em);
    const operations = [
      new LogisticsOperation(new Date('2023-10-01 14:30:00'), true, null, locations[0], operationTypes[0], orders[0]),
      new LogisticsOperation(new Date('2023-10-02 14:30:00'), false, null, locations[1], operationTypes[1], orders[1]),
      new LogisticsOperation(new Date('2023-10-03 14:30:00'), true, null, locations[0], operationTypes[0], orders[2]),
      new LogisticsOperation(new Date('2023-10-04 14:30:00'), false, null, locations[1], operationTypes[1], orders[3]),
      new LogisticsOperation(new Date('2023-10-05 14:30:00'), true, null, locations[0], operationTypes[0], orders[4]),
      new LogisticsOperation(new Date('2023-10-06 14:30:00'), false, null, locations[1], operationTypes[1], orders[5]),
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
