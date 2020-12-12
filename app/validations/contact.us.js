import Joi from 'joi';
import { stringCheck, emailCheck, numberCheck } from './generic';

const contactSchema = Joi.object({
  name: stringCheck('Name', Joi),
  message: stringCheck('Message', Joi),
  numberOfTanks: numberCheck('Number', Joi, 1),
  phoneNumber: stringCheck('Phone number', Joi),
  facilityType: Joi.array().required(),
  companyName: stringCheck('Company name', Joi, 3),
  email: emailCheck(Joi)
});

const contactUsSchema = Joi.object({
  name: stringCheck('Name', Joi),
  message: stringCheck('Message', Joi),
  phoneNumber: stringCheck('Phone number', Joi),
  companyName: stringCheck('Company name', Joi, 3),
  email: emailCheck(Joi)
});

export { contactSchema, contactUsSchema };
