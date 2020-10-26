import Joi from 'joi';
import { stringCheck, numberCheck } from './generic';

const priceSchema = Joi.object({
  fluidType: stringCheck('Fluid Type', Joi, 1, 150),
  amount: numberCheck('Amount', Joi)
});

export default priceSchema;
