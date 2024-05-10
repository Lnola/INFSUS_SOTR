import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import Trailer from 'trailer/entities/trailer.entity';

export class TrailerSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const trailers = [new Trailer('ZG-1235-RE', '2018', 20, 12.5), new Trailer('DA-432-E', '2017', 25, 14.0)];
    await em.persistAndFlush(trailers);
  }
}
