import { ConfigModule, registerAs } from '@nestjs/config';

const databaseConfig = registerAs('database', () => ({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: 'postgresql',
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: `${process.cwd()}/src/shared/database/migrations`,
    disableForeignKeys: false,
    pattern: /^\d+[\w-]+\.ts$/,
    fileName: (timestamp: string) => `${timestamp}-new-migration`,
  },
}));
export default databaseConfig;

export const DbConfigModule = ConfigModule.forRoot({
  load: [databaseConfig],
});
