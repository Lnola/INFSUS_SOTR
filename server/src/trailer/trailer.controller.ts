import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Pagination, { PaginationParams } from 'shared/decorators/pagination.decorator';
import { TrailerDto } from './trailer.dto';
import { TrailerService } from './trailer.service';

@Controller('trailers')
export class TrailerController {
  constructor(private readonly trailerService: TrailerService) {}

  @Get()
  findAll(@Pagination() pagination: PaginationParams) {
    return this.trailerService.find(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailerService.findOne(+id);
  }

  @Post()
  create(@Body() trailerDto: TrailerDto) {
    return this.trailerService.create(trailerDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() trailerDto: TrailerDto) {
    return this.trailerService.update(id, trailerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.trailerService.remove(id);
  }
}
