import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const {
  UPTIMA_PORT: PORT,
  UPTIMA_SECRET: SECRET,
  UPTIMA_NODE_ENV: NODE_ENV
} = process.env;

const currentEnv = {
  development,
  test,
  production
}[NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
  PORT,
  SECRET,
  NODE_ENV
};
