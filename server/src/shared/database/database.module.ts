import { ConfigModule } from '@nestjs/config';
import databaseConfig from 'config/database.config';

export const DatabaseModule = ConfigModule.forRoot({
  load: [databaseConfig],
});
