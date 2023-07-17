import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from 'env-var';

const host = env.get('DB_HOST').required().asString();
const port = env.get('DB_PORT').required().asPortNumber();
const username = env.get('DB_USERNAME').required().asString();
const password = env.get('DB_PASSWORD').required().asString();
const database = env.get('DB_DATABASE').required().asString();

export const mysqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host,
  port,
  username,
  password,
  database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
