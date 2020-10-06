import Joi from '@hapi/joi';
import { stringCheck } from './generic';

const complaintSchema = Joi.object({
  category: stringCheck('Category', Joi, 1, 50),
  message: stringCheck('Message', Joi)
});

export default complaintSchema;
