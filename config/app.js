/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import Kue from 'kue';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiV1Routes from '../app/routes/v1';
import config from './env';
import { Helper, genericErrors, constants } from '../app/utils';
import redisDB from '../app/db/setup/redis';

const { errorResponse, successResponse } = Helper;
const { notFoundApi } = genericErrors;
const { WELCOME, v1, WEBHOOK, REDIS_RUNNING } = constants;

const appConfig = (app) => {
  // integrate winston logger with morgan
  app.use(morgan('combined', { stream: logger.stream }));
  // adds security middleware to handle potential attacks from HTTP requests
  app.use(helmet());
  // adds middleware for cross-origin resource sharing configuration
  app.use(cors());
  // adds middleware that parses requests whose content-type is application/json
  app.use(
    json({
      verify: (req, res, buffer) => {
        if (req.url.startsWith(WEBHOOK)) {
          req.rawBody = buffer;
        }
      }
    })
  );
  // adds middleware that parses requests with x-www-form-urlencoded data encoding
  app.use(urlencoded({ extended: true }));
  // adds a heartbeat route for the culture
  app.get('/', (req, res) => successResponse(res, { message: WELCOME }));
  // Serves kue UI for viewing Jobs
  // app.use('/kue-ui', Kue.app);

  // serves v1 api routes
  app.use(v1, apiV1Routes);
  // catches 404 errors and forwards them to error handlers
  app.use((req, res, next) => {
    next(notFoundApi);
  });

  Kue.createQueue({
    redis: {
      port: config.redisPort,
      host: config.redisHost,
      auth: config.redisAuth
    }
  });
  app.use('/kue-ui', Kue.app);

  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err));
  // checks redis server for successful connection.
  // initialize the port constant
  const port = config.PORT || 3000;
  // server listens for connections
  redisDB.on('connect', () => logger.info(REDIS_RUNNING));
  app.listen(port, () => {
    logger.info(`${'UPTIMA'} ${port}`);
  });
};

export default appConfig;
