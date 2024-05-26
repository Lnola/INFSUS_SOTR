import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LogisticsOperationDto } from './dto/logistics-operation.dto';
import { LogisticsOperationService } from './logistics-operation.service';

@Controller('logistics-operations')
export class LogisticsOperationController {
  constructor(private readonly logisticsOperationService: LogisticsOperationService) {}

  @Get()
  findAll() {
    return this.logisticsOperationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logisticsOperationService.findOne(+id);
  }

  @Post()
  create(@Body() logisticsOperationDto: LogisticsOperationDto) {
    return this.logisticsOperationService.create(logisticsOperationDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() logisticsOperationDto: LogisticsOperationDto) {
    return this.logisticsOperationService.update(id, logisticsOperationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.logisticsOperationService.delete(id);
  }
}
