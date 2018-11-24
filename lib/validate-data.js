const Joi = require('joi')
const schema = Joi.object().keys({
  name: Joi.string().required(),
  mobile: Joi.number().required(),
  nomineeName: Joi.string().required(),
  nomineeMobile: Joi.number().required(),
  replyToNumber: Joi.number()
})

module.exports = data => {
  return Joi.validate(data, schema)
}
