import { Controller, Get, Param } from '@nestjs/common';
import { TruckService } from './truck.service';

@Controller('trucks')
export class TruckController {
  constructor(private readonly truckService: TruckService) {}

  @Get()
  findAll() {
    return this.truckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.truckService.findOne(+id);
  }
}
