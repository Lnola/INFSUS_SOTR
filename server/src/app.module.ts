import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import { DriverModule } from 'driver/driver.module';
import { HealthController } from 'health.controller';
import { LogisticsOperationModule } from 'logistics-operation/logistics-operation.module';
import { DatabaseModule } from 'shared/database/database.module';
import { TrailerModule } from 'trailer/trailer.module';
import { TruckModule } from 'truck/truck.module';
import { CompanyLocationModule } from './company-location/company-location.module';

const GlobalConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
});

@Module({
  imports: [GlobalConfigModule, DatabaseModule, CompanyLocationModule, DriverModule, TruckModule, TrailerModule, LogisticsOperationModule],
  controllers: [HealthController],
})
export class AppModule {}
