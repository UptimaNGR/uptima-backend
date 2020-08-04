import redis from 'redis';
import { promisifyAll } from 'bluebird';
import config from '../../../config/env';

// promisfies redis to enable the use of ES6 promises features.
promisifyAll(redis);

const { NODE_ENV, redisHost, redisPort, redisAuth } = config;

// eslint-disable-next-line import/no-mutable-exports
let redisDB;

if (NODE_ENV === 'production' || NODE_ENV === 'development' || NODE_ENV === 'test') {
  redisDB = redis.createClient({
    port: redisPort,
    host: redisHost,
    no_ready_check: true
  });

  redisDB.auth(redisAuth, (err, response) => {
    if (err) {
      throw err;
    }
    return response;
  });
}

export default redisDB;
