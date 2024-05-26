import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { OrderController } from './driver.controller';
import { OrderService } from './driver.service';
import OrderStatus from './entities/order-status.entity';
import Order from './entities/order.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Order, OrderStatus])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
