import Joi from 'joi';
import { stringCheck, editNumberCheck, arrayString } from './generic';

const tankDataSchema = Joi.object({
  distance: arrayString('Distance', Joi),
  serialNumber: stringCheck('Serial number', Joi),
  longitude: editNumberCheck('Longitude', Joi),
  latitude: editNumberCheck('Latitude', Joi)
});

export default tankDataSchema;
