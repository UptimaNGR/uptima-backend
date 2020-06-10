import Joi from '@hapi/joi';

const facilitySchema = Joi.object().keys({
  companyId: Joi.string(),
  gpsCoordinate: Joi.string().required(),
  facilityName: Joi.string().min(4).required(),
  facilityType: Joi.string().required(),
  address: Joi.string().required()
});

export default facilitySchema;
