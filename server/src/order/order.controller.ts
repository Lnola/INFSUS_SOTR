import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import Pagination, { PaginationParams } from 'shared/decorators/pagination.decorator';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async find(@Pagination() pagination: PaginationParams) {
    return this.orderService.find(pagination);
  }

  @Get('statuses')
  async getStatuses() {
    return this.orderService.findStatuses();
  }

  @Get(':id')
  async findOneOrder(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body('params') orderDto: OrderDto) {
    return this.orderService.create(orderDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body('params') orderDto: OrderDto) {
    return this.orderService.update(id, orderDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
