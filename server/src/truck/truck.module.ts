import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Truck from './entities/truck.entity';
import { TruckController } from './truck.controller';
import { TruckService } from './truck.service';

@Module({
  imports: [MikroOrmModule.forFeature([Truck])],
  providers: [TruckService],
  controllers: [TruckController],
})
export class TruckModule {}
