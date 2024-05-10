import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Driver from './entities/driver.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Driver])],
})
export class CompanyLocationModule {}
