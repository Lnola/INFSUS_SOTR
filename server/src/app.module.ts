import { Module } from '@nestjs/common';
import { DbConfigModule } from 'config/database.config';

@Module({
  imports: [DbConfigModule],
})
export class AppModule {}
