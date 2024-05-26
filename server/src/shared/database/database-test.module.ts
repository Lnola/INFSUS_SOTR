import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database.config';

@Module({})
export class MockDatabaseModule {
  static forRoot(options: MikroOrmModuleOptions = {}): DynamicModule {
    return {
      module: MockDatabaseModule,
      imports: [
        MikroOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            ...config.get('database'),
            autoLoadEntities: true,
            ...options,
          }),
        }),
      ],
    };
  }
}

export const MockDatabaseModuleConfig = [
  ConfigModule.forRoot({ load: [databaseConfig] }),
  MockDatabaseModule.forRoot({
    allowGlobalContext: true,
    debug: false,
    autoLoadEntities: false,
    entities: ['**/*.entity.ts'],
  }),
];
