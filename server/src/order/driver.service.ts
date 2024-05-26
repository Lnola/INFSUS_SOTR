import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import Order from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: EntityRepository<Order>,
  ) {}

  async find({ page, pageSize }: PaginationParams) {
    const paginationOptions = {
      offset: page * pageSize,
      limit: pageSize,
    };
    const [items, count] = await this.orderRepository.findAndCount({}, paginationOptions);
    return { items, count };
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOne(id);
    if (!order) throw new NotFoundException('Order not found!');
    return this.orderRepository.getEntityManager().removeAndFlush(order);
  }
}
