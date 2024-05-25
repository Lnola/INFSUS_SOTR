import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import Trailer from './entities/trailer.entity';
import { TrailerController } from './trailer.controller';
import { TrailerService } from './trailer.service';

@Module({
  imports: [MikroOrmModule.forFeature([Trailer])],
  providers: [TrailerService],
  controllers: [TrailerController],
})
export class TrailerModule {}
