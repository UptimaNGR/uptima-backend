import Joi from '@hapi/joi';

const contactSchema = Joi.object().keys({
  name: Joi.string().required(),
  message: Joi.string().required(),
  numberOfTanks: Joi.number().min(1).required(),
  phoneNumber: Joi.string().required(),
  facilityType: Joi.string().required(),
  companyName: Joi.string().required(),
  email: Joi.string().email().required()
});

export default contactSchema;
