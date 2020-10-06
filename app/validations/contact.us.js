import Joi from 'joi';

const contactSchema = Joi.object().keys({
  name: Joi.string().required(),
  message: Joi.string().required(),
  numberOfTanks: Joi.number().min(1).required(),
  phoneNumber: Joi.string().required(),
  facilityType: Joi.array().required(),
  companyName: Joi.string().required(),
  email: Joi.string().email().required()
});

const contactUsSchema = Joi.object().keys({
  name: Joi.string().required(),
  message: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  companyName: Joi.string().required(),
  email: Joi.string().email().required()
});

export { contactSchema, contactUsSchema };
