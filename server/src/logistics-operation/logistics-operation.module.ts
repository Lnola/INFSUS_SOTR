import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import LogisticsOperationType from './entities/logistics-operation-type.entity';
import LogisticsOperation from './entities/logistics-operation.entity';

@Module({
  imports: [MikroOrmModule.forFeature([LogisticsOperation, LogisticsOperationType])],
})
export class CompanyLocationModule {}
