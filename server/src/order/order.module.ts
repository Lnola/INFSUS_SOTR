import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import OrderStatus from './entities/order-status.entity';
import Order from './entities/order.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Order, OrderStatus])],
})
export class CompanyLocationModule {}
