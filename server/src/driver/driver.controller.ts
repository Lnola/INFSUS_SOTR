import { Body, Controller, Get, Post } from '@nestjs/common';
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
  create(@Body('params') createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }
}
