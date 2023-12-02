const { celebrate, Joi } = require('celebrate');

module.exports.celebrateCreateBoard = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2),
    description: Joi.string().required().min(2),
    owner: Joi.string().required().min(2),
    style: Joi.string().required().min(2),
    date: Joi.date().required().min(2),
  }),
});