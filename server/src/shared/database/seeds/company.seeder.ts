import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Company from 'company/entities/company.entity';

export class CompanySeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const companies = [new Company('12345678901', 'Konzum plus d.o.o.'), new Company('98765432109', 'Instar d.o.o.')];
    await em.persistAndFlush(companies);
  }
}
