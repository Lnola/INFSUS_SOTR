import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Trailer from './entities/trailer.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Trailer])],
})
export class CompanyLocationModule {}
