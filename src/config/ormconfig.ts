import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_URL,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['dist/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
  useUTC: true,
  schema: 'public',
  logNotifications: false,
  logger: 'file',
});
