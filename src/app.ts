import express from 'express';
import cors from 'cors';
import { AppRouter } from './router/AppRouter';

const swaggerJsDocs = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1', // Essesntial
    info: {
      title: 'backend-developer-task',
      version: '1.0.0',
      description:
        'Notes can be organized into folders for easier management.   API should allow user authentication through basic HTTP authentication (username and password).   The goal is to build a simple but secure and easily scalable service.',
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

app.use('/', swaggerUI.serve, swaggerUI.setup(specs)); //Serve swagger on root

app.use(express.json()); //allow to parse JSON
app.use(express.urlencoded({ extended: true })); //allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cors()); //Cross-Origin Resource Sharing

app.use(AppRouter.getInstance()); //Get instance of the Router

export default app;
