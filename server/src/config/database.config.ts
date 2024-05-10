import { Migrator } from '@mikro-orm/migrations';
import { defineConfig, LoadStrategy } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { registerAs } from '@nestjs/config';
import { dash } from 'radash';

const config = defineConfig({
  port: +process.env.DB_PORT,
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  loadStrategy: LoadStrategy.JOINED,
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: `${process.cwd()}/dist/shared/database/migrations`,
    pathTs: `${process.cwd()}/src/shared/database/migrations`,
    glob: '!(*.d).{js,ts}',
    fileName: (timestamp: string) => `${timestamp}-new-migration`,
  },
  seeder: {
    path: `${process.cwd()}/dist/shared/database/seeds`,
    pathTs: `${process.cwd()}/src/shared/database/seeds`,
    fileName: (className: string) => dash(className),
  },
  extensions: [Migrator, SeedManager],
});

export default registerAs('database', () => config);
