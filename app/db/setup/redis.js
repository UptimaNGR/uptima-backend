// import redis from 'redis';
// import { promisifyAll } from 'bluebird';
// import config from '../../../config/env';

// // promisfies redis to enable the use of ES6 promises features.
// promisifyAll(redis);

// const { NODE_ENV, redisHost, redisPort, redisAuth } = config;


// // eslint-disable-next-line import/no-mutable-exports
// let redisDB;

// if (NODE_ENV === 'development') {
//   redisDB = redis.createClient({
//     port: redisPort,
//     host: redisHost
//   });

//   redisDB.auth(redisAuth, (err, response) => {
//     if (err) {
//       throw err;
//     }
//     return response;
//   });
// }
// if (NODE_ENV === 'development') {
//   redisDB = redis.createClient();
// }
// if (NODE_ENV === 'test') {
//   redisDB.select(3, async (err) => {
//     if (err) {
//       logger.error(`An Error occurred while spawning a
//     new Redis database with the following message: ${err.message}`);
//       process.exit(1);
//     } else {
//       try {
//         await redisDB.flushdbAsync();
//       } catch (e) {
//         logger.error(
//           `An Error occurred while removing test keys with the message: ${e.message}`
//         );
//       }
//     }
//   });
// }

// // Spawns a new redis connection instance that holds
// // the same configuration as the client above with an option to change configurations.
// const cloneRedisDB = (options = {}) => redisDB.duplicateAsync(options);

// export { redisDB, cloneRedisDB };
