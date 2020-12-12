import Joi from 'joi';
import { stringCheck, editStringCheck } from './generic';

const deviceSchema = Joi.object({
  companyId: editStringCheck('Company id', Joi),
  facilityId: editStringCheck('Facility id', Joi),
  tankId: editStringCheck('Tank id', Joi),
  serialNumber: stringCheck('Serial number', Joi),
  distToDevice: Joi.number().required()
});

export default deviceSchema;
