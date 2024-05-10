import databaseConfig from 'config/database.config';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  ...databaseConfig(),
  entities: [`${__dirname}/**/entities/*.ts`],
};
