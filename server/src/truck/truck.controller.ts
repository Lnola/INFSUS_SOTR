import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import Pagination, { PaginationParams } from 'shared/decorators/pagination.decorator';
import { TruckDto } from './dto/truck.dto';
import { TruckService } from './truck.service';

@Controller('trucks')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Get()
  findAll(@Pagination() pagination: PaginationParams) {
    return this.truckService.find(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.truckService.findOne(+id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() truckDto: TruckDto) {
    return this.truckService.create(truckDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() truckDto: TruckDto) {
    return this.truckService.update(id, truckDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.truckService.remove(id);
  }
}
