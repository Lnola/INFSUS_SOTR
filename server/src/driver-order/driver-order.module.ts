import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import DriverOrder from './entities/driver-order.entity';

@Module({
  imports: [MikroOrmModule.forFeature([DriverOrder])],
})
export class CompanyLocationModule {}
