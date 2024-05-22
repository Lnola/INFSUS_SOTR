import { Controller, Get, Param } from '@nestjs/common';
import Pagination, { PaginationParams } from 'shared/decorators/pagination.decorator';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async findAll(@Pagination() pagination: PaginationParams) {
    console.log('Pagination:', pagination);
    return this.driverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driverService.findOne(+id);
  }
}
