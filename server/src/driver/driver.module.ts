import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import Driver from './entities/driver.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Driver])],
  providers: [DriverService],
  controllers: [DriverController],
})
export class DriverModule {}
