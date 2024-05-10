import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { CompanyLocationSeeder } from './company-location.seeder';
import { CompanySeeder } from './company.seeder';
import { DriverSeeder } from './driver.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [CompanySeeder, CompanyLocationSeeder, DriverSeeder]);
  }
}
