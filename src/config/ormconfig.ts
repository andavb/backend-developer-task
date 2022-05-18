import { ConnectionOptions } from 'typeorm';

export default {
  type: process.env.DB_TYPE,
  host: process.env.DB_URL,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
  synchronize: true,
  useUTC: true,
  schema: 'public',
} as ConnectionOptions;
