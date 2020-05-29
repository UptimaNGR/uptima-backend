import redis from 'redis';
import { promisifyAll } from 'bluebird';
import config from '../../../config/env';

// promisfies redis to enable the use of ES6 promises features.
promisifyAll(redis);

const { NODE_ENV, REDIS_URL } = config;
console.log(REDIS_URL);

// eslint-disable-next-line import/no-mutable-exports
let redisDB;

if (NODE_ENV === 'production') {
  console.log('prod');
  redisDB = redis.createClient(REDIS_URL);
}
if (NODE_ENV === 'development') {
  console.log('dev');
  redisDB = redis.createClient();
}
if (NODE_ENV === 'test') {
  console.log('test');
  redisDB.select(3, async (err) => {
    if (err) {
      logger.error(`An Error occurred while spawning a 
    new Redis database with the following message: ${err.message}`);
      process.exit(1);
    } else {
      try {
        await redisDB.flushdbAsync();
      } catch (e) {
        logger.error(
          `An Error occurred while removing test keys with the message: ${e.message}`
        );
      }
    }
  });
}

// Spawns a new redis connection instance that holds
// the same configuration as the client above with an option to change configurations.
const cloneRedisDB = (options = {}) => redisDB.duplicateAsync(options);

export { redisDB, cloneRedisDB };
