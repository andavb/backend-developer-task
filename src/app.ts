import express from 'express';
import cors from 'cors';
import { AppRouter } from './router/AppRouter';

const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

//Controllers ...
import './controllers/authentication.controller';
import './controllers/folder.controller';
import './controllers/note.controller';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1', // Essesntial
    info: {
      title: 'backend-developer-task',
      version: '1.0.0',
      description:
        'To login send a request "/auth/login" with username and password, you will get a response body with access_token, copy access token value, click on the button "Authorize" and then you can use protected routes.',
    },
    basePath: '/',
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`${__dirname}/controllers/*.ts`],
};

const specs = swaggerJsDocs(swaggerOptions); //Init swagger specs

const app = express();

app.use('/apis', swaggerUI.serve, swaggerUI.setup(specs)); //Serve swagger on root

app.use(express.json()); //allow to parse JSON
app.use(express.urlencoded({ extended: true })); //allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cors()); //Cross-Origin Resource Sharing

app.use(AppRouter.getInstance()); //Get instance of the Router

export default app;
