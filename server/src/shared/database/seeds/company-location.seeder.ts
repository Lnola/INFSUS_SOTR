import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Company from 'company/company.entity';
import CompanyLocation from 'company-location/company-location.entity';

export class CompanyLocationSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const companies = await this.getCompanies(em);
    const locations = [
      new CompanyLocation('Marijana Čavića 1A', '10000', 'Zagreb', 'Croatia', 'Konzum Sjedište', companies[0]),
      new CompanyLocation(
        'Ulica kralja Stjepana Držislava 22',
        '21000',
        'Split',
        'Croatia',
        'Super Konzum Sirobuja',
        companies[0],
      ),
      new CompanyLocation(
        'Fiumara ulica 15',
        '51000',
        'Rijeka',
        'Croatia',
        'Instar skladište Rijeka centar',
        companies[1],
      ),
    ];

    await em.persistAndFlush(locations);
  }

  async getCompanies(em: EntityManager) {
    return em.find(Company, {});
  }
}
