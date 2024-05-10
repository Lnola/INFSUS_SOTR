import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Driver from 'driver/entities/driver.entity';

export class DriverSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const drivers = [
      new Driver('John', 'Doe', '123-456-7890', new Date('2012-01-15'), null),
      new Driver('Jane', 'Smith', '987-654-3210', new Date('2019-05-20'), new Date('2022-12-31')),
    ];
    await em.persistAndFlush(drivers);
  }
}
