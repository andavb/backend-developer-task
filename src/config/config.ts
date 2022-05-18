require('dotenv').config();
import { DomainConfig } from '../interfaces/Config/domain.interface';

export class Config {
  static Server() {
    return {
      Port: +process.env.DOMAIN_PORT,
    };
  }

  static Domain(): DomainConfig {
    return {
      http: process.env.DOMAIN_HTTP_VERSION,
      name: process.env.DOMAIN_NAME,
      port: +process.env.DOMAIN_PORT,
    };
  }
}
