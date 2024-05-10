import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Truck from './entities/truck.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Truck])],
})
export class CompanyLocationModule {}
