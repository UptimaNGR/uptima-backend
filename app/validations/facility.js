import Joi from 'joi';

const facilitySchema = Joi.object().keys({
  companyId: Joi.string(),
  gpsCoordinate: Joi.string().required(),
  facilityName: Joi.string().min(4).required(),
  facilityType: Joi.string().required(),
  address: Joi.string().required(),
  closingTime: Joi.number(),
  openingTime: Joi.number()
});

export default facilitySchema;
