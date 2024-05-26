import { Controller, Delete, Get, Param } from '@nestjs/common';
import Pagination, { PaginationParams } from 'shared/decorators/pagination.decorator';
import { OrderService } from './driver.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async find(@Pagination() pagination: PaginationParams) {
    return this.orderService.find(pagination);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
