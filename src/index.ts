import { Config } from './config/config';
import app from './app';
import { createConnection } from 'typeorm';

const main = async () => {
  try {
    const conn = await createConnection(Config.DatabaseORM());
    console.log('Connected to postgres!');

    console.log('Running migrations...');
    await conn.runMigrations();

    return app.listen(Config.Server().Port, () => {
      console.log(`App is listening on port ${Config.Server().Port}`);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Initialization failed');
  }
};

main();
