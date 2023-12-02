const jwt = require('jsonwebtoken');

const AuthorizeError = require('../errors/AuthorizeError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new AuthorizeError('Необходима авторизация'));
  }
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
    );
  } catch (err) {
    return next(new AuthorizeError('Необходима авторизация'));
  }

  return next();
};