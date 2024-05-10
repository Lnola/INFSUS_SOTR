import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { CompanyLocationSeeder } from './company-location.seeder';
import { CompanySeeder } from './company.seeder';
import { DriverOrderSeeder } from './driver-order.seeder';
import { DriverSeeder } from './driver.seeder';
import { LogisticsOperationSeeder } from './logistics-operation.seeder';
import { OrderSeeder } from './order.seeder';
import { TrailerSeeder } from './trailer.seeder';
import { TruckSeeder } from './truck.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      CompanySeeder,
      CompanyLocationSeeder,
      DriverSeeder,
      TruckSeeder,
      TrailerSeeder,
      OrderSeeder,
      LogisticsOperationSeeder,
      DriverOrderSeeder,
    ]);
  }
}
