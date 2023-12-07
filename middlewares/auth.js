const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AuthorizeError = require('../errors/AuthorizeError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = async (req, res, next) => {
  const { jwt: token, uid } = req.cookies;

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

  const user = await User.findUserById(uid);

  req.user = user;

  return next();
};