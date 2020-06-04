import Joi from '@hapi/joi';

const tankSchema = Joi.object().keys({
  companyId: Joi.string().required(),
  facilityId: Joi.string().required(),
  serialNumber: Joi.number().required(),
  fluidType: Joi.string().required(),
  surfaceArea: Joi.number().required(),
  structureType: Joi.string().required(),
  totalVolume: Joi.number().required(),
  height: Joi.number().required()
});

export default tankSchema;
