const { celebrate, Joi } = require('celebrate');

module.exports.celebrateSignUp = celebrate({
  body: Joi.object().keys({
    nickname: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.celebrateSignIn = celebrate({
  body: Joi.object().keys({
    identifier: Joi.string().required().min(2),
    password: Joi.string().required(),
  }),
});
