import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import Pagination, { PaginationParams } from 'shared/decorators/pagination.decorator';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async find(@Pagination() pagination: PaginationParams) {
    return this.driverService.find(pagination);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body('params') createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body('params') updateDriverDto: CreateDriverDto) {
    return this.driverService.update(id, updateDriverDto);
  }
}
