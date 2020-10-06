import Joi from 'joi';
import { stringCheck, numberCheck } from './generic';

const expansionSchema = Joi.object({
  address: stringCheck('Address', Joi, 1, 50),
  capacity: numberCheck('Capacity', Joi, 1),
  facilityType: stringCheck('Facility Type', Joi)
});

export default expansionSchema;
