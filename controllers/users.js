const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const AuthorizeError = require('../errors/AuthorizeError');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.signUp = (req, res, next) => {
  const { nickname, email, password, avatar } = req.body;

  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => {
      return Promise.all([
        User.findOne({ nickname }),
        User.findOne({ email }),
      ])
        .then(([existingUserByNickname, existingUserByEmail]) => {
          // если никнейм занят, выдадим ошибку
          if (existingUserByNickname) throw new ConflictError('Такое имя пользователя уже занято');
          // если почта занята, выдадим другую ошибку
          if (existingUserByEmail) throw new ConflictError('Пользователь с такой почтой уже зарегистрирован');

          return User.create({
            nickname,
            email,
            avatar,
            password: hash,
          });
        });
    })
    // Отправляем данные пользователя со статусом успешной регистрации
    .then((user) => {
      res.status(200).send({
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Введены некорректные данные для регистрации'));
      } else {
        next(err);
      }
    });
};

module.exports.signIn = (req, res, next) => {
  const { identifier, password } = req.body;
  User.findUserByCredentials(identifier, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign(
          { _id },
          NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
          { expiresIn: '7d' },
        );

        const sevenDays = 1000 * 60 * 60 * 24 * 7;
        res.cookie('jwt', token, { maxAge: sevenDays})
        res.cookie('uid', _id.toString())
        return res.status(200).send();
      }

      throw new AuthorizeError('Неверный логин или пароль');
    })
    .catch(err => next(err));
};
