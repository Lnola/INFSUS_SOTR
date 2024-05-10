import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CompanyLocationController } from './company-location.controller';
import { CompanyLocationService } from './company-location.service';
import CompanyLocation from './entities/company-location.entity';

@Module({
  imports: [MikroOrmModule.forFeature([CompanyLocation])],
  providers: [CompanyLocationService],
  controllers: [CompanyLocationController],
})
export class CompanyLocationModule {}
