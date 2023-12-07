import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { env } from 'process';
import * as path from 'path';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const logger = new Logger(path.basename(__filename));

dotenv.config();

export const masterDataSourceConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/master-migration/*{.ts,.js}'],
  logging: env.TYPEORM_LOGGING === 'true',
  synchronize: false,
  dropSchema: false,
  timezone: 'Z',
};

logger.log(`master Db Host: ${env.DB_HOST}`);
