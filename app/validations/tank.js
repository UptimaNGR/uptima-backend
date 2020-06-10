import Joi from '@hapi/joi';

const tankSchema = Joi.object().keys({
  companyId: Joi.string(),
  facilityId: Joi.string(),
  serialNumber: Joi.number().required(),
  fluidType: Joi.string().required(),
  surfaceArea: Joi.number().required(),
  structureType: Joi.string().required(),
  totalVolume: Joi.number().required(),
  height: Joi.number().required()
});

export default tankSchema;
