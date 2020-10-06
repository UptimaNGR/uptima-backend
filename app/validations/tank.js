import Joi from 'joi';

const tankSchema = Joi.object().keys({
  companyId: Joi.string(),
  facilityId: Joi.string(),
  serialNumber: Joi.number().required(),
  fluidType: Joi.string().required(),
  surfaceArea: Joi.array()
    .unique((a, b) => a === b)
    .items()
    .required()
    .messages({
      'any.required': 'surface area is a required field',
      'string.empty': 'surface area cannot be left empty',
      'array.unique': 'surface area can not contain duplicates'
    }),
  structureType: Joi.string().required(),
  totalVolume: Joi.number(),
  height: Joi.number().required()
});

export default tankSchema;
