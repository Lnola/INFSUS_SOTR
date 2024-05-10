import { Module } from '@nestjs/common';
import { HealthController } from 'health.controller';
import { DatabaseModule } from 'shared/database/database.module';
import { OrmModule } from 'shared/database/mikro-orm.module';

@Module({
  imports: [DatabaseModule, OrmModule],
  controllers: [HealthController],
})
export class AppModule {}
