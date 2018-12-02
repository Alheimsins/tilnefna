const Joi = require('joi')
const schema = Joi.object().keys({
  mobile: Joi.number().required(),
  message: Joi.string().required()
})

module.exports = data => {
  return Joi.validate(data, schema)
}
