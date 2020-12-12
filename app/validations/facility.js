import Joi from 'joi';
import { stringCheck, numberCheck, editStringCheck } from './generic';

const facilitySchema = Joi.object({
  companyId: editStringCheck('Company id', Joi),
  gpsCoordinate: stringCheck('GPS coordinates', Joi),
  facilityName: stringCheck('Facility Name ', Joi, 4),
  facilityType: stringCheck('Facility type', Joi),
  address: stringCheck('Address ', Joi),
  closingTime: numberCheck('Closing time', Joi),
  openingTime: numberCheck('Opening time', Joi)
});

export default facilitySchema;
