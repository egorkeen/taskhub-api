const { celebrate, Joi } = require('celebrate');

module.exports.celebrateCreateTask = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    author: Joi.string().required().min(2),
    implementer: Joi.string().min(2),
    deadline: Joi.string().min(2),
  }),
});