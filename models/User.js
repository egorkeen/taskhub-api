const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizeError = require('../errors/AuthorizeError');
const { defaultImage, URL_REGEX } = require('../utils/constants');

const userSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Введён некорректный email',
    },
  },

  password: {
    type: String,
    required: true,
    // защищаем поле пароля от несанкционированных поисков
    select: false,
  },

  avatar: {
    type: String,
    default: defaultImage,
    validate: URL_REGEX,
  }
});

userSchema.statics.findUserByCredentials = function (identifier, password) {
  return this.findOne({
    // вход по почте или паролю
    $or: [
      { email: identifier },
      { nickname: identifier }
    ]
  //   включаем поле password в поиск
  }).select('+password')
    .then((user) => {
      if (user) {
        // сравниваем пароли
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) return user;
            return Promise.reject(new AuthorizeError('Введены неправильные данные'));
          });
      }

      return Promise.reject(new AuthorizeError('Введены неправильные данные'));
    });
};


const User = mongoose.model('User', userSchema);

module.exports = User;