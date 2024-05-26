import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import LogisticsOperationType from './entities/logistics-operation-type.entity';
import LogisticsOperation from './entities/logistics-operation.entity';
import { LogisticsOperationController } from './logistics-operation.controller';
import { LogisticsOperationService } from './logistics-operation.service';

@Module({
  imports: [MikroOrmModule.forFeature([LogisticsOperation, LogisticsOperationType])],
  providers: [LogisticsOperationService],
  controllers: [LogisticsOperationController],
})
export class LogisticsOperationModule {}
