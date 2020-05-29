/* eslint-disable no-unused-vars */
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiV1Routes from '../app/routes/v1';
import config from './env';
import { Helper, genericErrors, constants } from '../app/utils';

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

  // handles all forwarded errors
  app.use((err, req, res, next) => errorResponse(req, res, err));
  // checks redis server for successful connection.
  // initialize the port constant
  const port = config.PORT || 6500;
  logger.info(port);
  // server listens for connections
  app.listen(port, () => {
    logger.info(`${'UPTIMA'} ${port}`);
  });
};

export default appConfig;
