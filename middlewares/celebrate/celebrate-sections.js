const { celebrate, Joi } = require('celebrate');

module.exports.celebrateCreateSection = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
  }),
});
