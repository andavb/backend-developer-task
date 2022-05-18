require('dotenv').config();
import { ConnectionOptions } from 'typeorm';
import { DomainConfig } from '../interfaces/Config/domain.interface';
import config from './ormconfig';

export class Config {
  static Server() {
    return {
      Port: +process.env.DOMAIN_PORT,
    };
  }

  static DatabaseORM(): ConnectionOptions {
    return config;
  }

  static Domain(): DomainConfig {
    return {
      http: process.env.DOMAIN_HTTP_VERSION,
      name: process.env.DOMAIN_NAME,
      port: +process.env.DOMAIN_PORT,
    };
  }
}
