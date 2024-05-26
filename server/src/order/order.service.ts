import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, UniqueConstraintViolationException } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import Company from 'company/entities/company.entity';
import { PaginationParams } from 'shared/decorators/pagination.decorator';
import Trailer from 'trailer/entities/trailer.entity';
import Truck from 'truck/entities/truck.entity';
import { OrderDto } from './dto/order.dto';
import OrderStatus from './entities/order-status.entity';
import Order from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: EntityRepository<Order>,
    @InjectRepository(Truck)
    private truckRepository: EntityRepository<Truck>,
    @InjectRepository(Trailer)
    private trailerRepository: EntityRepository<Trailer>,
    @InjectRepository(Company)
    private companyRepository: EntityRepository<Company>,
    @InjectRepository(OrderStatus)
    private orderStatusRepository: EntityRepository<OrderStatus>,
  ) {}

  async find({ page, pageSize }: PaginationParams) {
    const paginationOptions = {
      offset: page * pageSize,
      limit: pageSize,
    };
    const [items, count] = await this.orderRepository.findAndCount({}, paginationOptions);
    return { items, count };
  }

  async create(orderDto: OrderDto) {
    try {
      const truck = await this.truckRepository.findOne(orderDto.truckId);
      if (!truck) throw new NotFoundException('Truck not found!');
      const trailer = await this.trailerRepository.findOne(orderDto.trailerId);
      if (!trailer) throw new NotFoundException('Trailer not found!');
      const financer = await this.companyRepository.findOne(orderDto.financerId);
      if (!financer) throw new NotFoundException('Financer not found!');
      const status = await this.orderStatusRepository.findOne(orderDto.statusId);
      if (!status) throw new NotFoundException('Status not found!');
      const order = new Order(orderDto.transportPrice, orderDto.distance, truck, trailer, financer, status);
      await this.orderRepository.getEntityManager().persistAndFlush(order);
    } catch (error) {
      if (error instanceof UniqueConstraintViolationException)
        throw new BadRequestException('Order with this contact number already exists!');

      throw error;
    }
  }

  async update(id: number, orderDto: OrderDto) {
    const order = await this.orderRepository.findOne(id);
    if (!order) throw new NotFoundException('Order not found!');
    const truck = await this.truckRepository.findOne(orderDto.truckId);
    if (!truck) throw new NotFoundException('Truck not found!');
    const trailer = await this.trailerRepository.findOne(orderDto.trailerId);
    if (!trailer) throw new NotFoundException('Trailer not found!');
    const financer = await this.companyRepository.findOne(orderDto.financerId);
    if (!financer) throw new NotFoundException('Financer not found!');
    const status = await this.orderStatusRepository.findOne(orderDto.statusId);
    if (!status) throw new NotFoundException('Status not found!');
    order.transportPrice = orderDto.transportPrice;
    order.distance = orderDto.distance;
    order.truck = truck;
    order.trailer = trailer;
    order.financer = financer;
    order.status = status;
    return await this.orderRepository.getEntityManager().persistAndFlush(order);
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOne(id);
    if (!order) throw new NotFoundException('Order not found!');
    return this.orderRepository.getEntityManager().removeAndFlush(order);
  }
}
