import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Company from 'company/entities/company.entity';
import Trailer from 'trailer/entities/trailer.entity';
import Truck from 'truck/entities/truck.entity';
import OrderStatus from './entities/order-status.entity';
import Order from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [MikroOrmModule.forFeature([Order, OrderStatus, Truck, Trailer, Company])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
