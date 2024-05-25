import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import { HealthController } from 'health.controller';
import { DatabaseModule } from 'shared/database/database.module';
import { TruckModule } from 'truck/truck.module';
import { CompanyLocationModule } from './company-location/company-location.module';

const GlobalConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
});

@Module({
  imports: [GlobalConfigModule, DatabaseModule, CompanyLocationModule, TruckModule],
  controllers: [HealthController],
})
export class AppModule {}
