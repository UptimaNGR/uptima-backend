import Joi from 'joi';
import { stringCheck, emailCheck, editStringCheck } from './generic';

const companySchema = Joi.object({
  address: stringCheck('Address', Joi, 5, 150),
  phoneNumber: stringCheck('Phone Number', Joi, 10, 150),
  companyName: stringCheck('Company Name', Joi, 2, 150),
  subscriptionType: stringCheck('Subscription Type', Joi, 3, 150),
  subscriptionStatus: stringCheck('Subscription Status', Joi, 3, 150),
  email: emailCheck(Joi),
  companyLogo: editStringCheck('CompanyLogo', Joi, 20)
});

export default companySchema;
