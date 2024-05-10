import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Truck from 'truck/truck.entity';

export class TruckSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const trucks = [new Truck('ZG-9271-RO', '2020', 500, 250), new Truck('VŽ-1458-MH', '2019', 450, 300)];
    await em.persistAndFlush(trucks);
  }
}
