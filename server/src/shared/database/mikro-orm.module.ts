import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const OrmModule = MikroOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    console.log(config.get('database'));
    return {
      ...config.get('database'),
      autoLoadEntities: true,
    };
  },
});
