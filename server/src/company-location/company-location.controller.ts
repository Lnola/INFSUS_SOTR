import { Controller, Get, Param } from '@nestjs/common';
import { CompanyLocationService } from './company-location.service';

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
}
