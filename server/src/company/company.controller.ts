import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Post()
  create(@Body() companyDto: CompanyDto) {
    return this.companyService.create(companyDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() companyDto: CompanyDto) {
    return this.companyService.update(id, companyDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.companyService.delete(id);
  }
}
