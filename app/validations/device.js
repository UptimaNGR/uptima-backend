import Joi from 'joi';

const deviceSchema = Joi.object().keys({
  companyId: Joi.string(),
  facilityId: Joi.string(),
  tankId: Joi.string(),
  serialNumber: Joi.string().required(),
  distToDevice: Joi.number().required()
});

export default deviceSchema;
