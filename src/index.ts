import { Config } from './config/config';
import app from './app';
import { AppDataSource } from './config/ormconfig';

const main = async () => {
  try {
    AppDataSource.initialize()
      .then(() => {
        console.log('Connected to postgres!');
      })
      .catch((error) => {
        console.log('Connection to postgres FAILED!');
        console.log(error);
      });

    // await AppDataSource.runMigrations();

    return app.listen(Config.Server().Port, () => {
      console.log(`App is listening on port ${Config.Server().Port}`);
    });
  } catch (error) {
    console.log(error);
    throw new Error('Initialization failed');
  }
};

main();
