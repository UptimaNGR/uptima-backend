import Kue from 'kue';
import jobEvents from './events';
import config from '../../config/env';
import { Helper, constants } from '../utils';

const { moduleErrLogMessager } = Helper;
const { FAILED_CREATE_JOB } = constants;

// create queue to save jobs in
export const queue = Kue.createQueue({
  prefix: 'q',
  redis: {
    port: config.redisPort,
    host: config.redisHost,
    auth: config.redisAuth
  },
  db: 3,
  jobEvents: false
});

// Set max EventListeners
queue.setMaxListeners(queue.getMaxListeners() + 100);

// Register all events
jobEvents(queue);

/**
 * An implementation of instant and recurring Job creators.
 *
 * @class Job
 */
class Job {
  /**
   * Creates a new Job instance and saves it to the job queue.
   * @static
   * @memberof Job
   * @param { Object } options - An options object for configuring the job.
   * @param { String } options.type - The type of the job.
   * @param { Object } options.data - The job payload also containing its title.
   * @param { Number } options.priority -  The job priority in terms of
   * numbers default is 0 which mean normal.
   * @param { Number } options.attempts - The number of attempts, the default is 5.
   * @returns { Object } - A Job instance.
   */
  static create(options) {
    const opts = { priority: 0, attempts: 5, ...options };
    queue
      .create(opts.type, opts.data)
      .attempts(opts.attempts)
      .priority(opts.priority)
      .backoff((attempts) => 60000 * (2 ** attempts))
      .save((error) => {
        if (error) {
          error.status = FAILED_CREATE_JOB(opts.type);
          moduleErrLogMessager(error);
        }
      });
  }
}

// Queue Events
// Fires when a job is added to queue
queue.on('job enqueue', (id, type) => {
  logger.info(`The job ${id} of type: ${type} got added to queue`);
});
// Fires when a job is done with.
queue.on('job complete', (id) => {
  logger.info(`Job with the id: ${id} just completed`);
  Kue.Job.get(id, (error, job) => {
    if (error) {
      return logger.warn(`${constants.COULD_NOT_FETCH_COMPLETED_JOB}, 
      this is probably not a problem, as it might have been 
      removed by another worker from the cluster.`);
    }
    job.remove((err) => {
      if (err) {
        err.status = constants.COULD_NOT_REMOVE_COMPLETED_JOB;
        moduleErrLogMessager(err);
      }
      logger.info(`removed completed job ${job.id}`);
    });
  });
});

// Fires when a job fails after a certain retry.
queue.on('failed attempt', (id, msg, doneAttempts) => {
  if (logger) {
    logger.info(
      `Job of id: ${id} failed with the message: ${msg} after ${doneAttempts} attempts`
    );
  }
});
// Fires whenever a job fails.
queue.on('failed', (id, msg) => {
  if (logger) logger.info(`Job of id: ${id} has failed with the message: ${msg}`);
});

queue.watchStuckJobs(60 * 1000);

export default Job;
