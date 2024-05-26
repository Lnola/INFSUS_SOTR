import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyLocationService } from './company-location.service';
import { CompanyLocationDto } from './dto/company-location.dto';

@Controller('company-location')
export class CompanyLocationController {
  constructor(private readonly companyLocationService: CompanyLocationService) {}

  @Get()
  findAll() {
    return this.companyLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyLocationService.findOne(+id);
  }

  @Post()
  create(@Body() companyLocationDto: CompanyLocationDto) {
    return this.companyLocationService.create(companyLocationDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() companyLocationDto: CompanyLocationDto) {
    return this.companyLocationService.update(id, companyLocationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.companyLocationService.remove(id)
  }
}
