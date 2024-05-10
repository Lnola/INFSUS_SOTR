import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Company from './entities/company.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Company])],
})
export class CompanyLocationModule {}
