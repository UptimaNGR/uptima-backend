import Joi from '@hapi/joi';

const deviceSchema = Joi.object().keys({
  companyId: Joi.string().required(),
  facilityId: Joi.string().required(),
  tankId: Joi.string().required(),
  serialNumber: Joi.string().required(),
  distToDevice: Joi.number().required()
});

export default deviceSchema;
