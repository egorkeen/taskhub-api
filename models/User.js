const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizeError = require('../errors/AuthorizeError');
const NotFoundError = require('../errors/NotFoundError');
const { defaultImage } = require('../utils/constants/default');
const { URL_REGEX } = require('../utils/constants/regex');

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
  },

  userBoardsIds: {
    type: Array,
    default: [],
  },
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
            return user;
            // if (matched) return user;
            // return Promise.reject(new AuthorizeError('Введены неправильные данные'));
          });
      }

      return Promise.reject(new AuthorizeError('Введены неправильные данные'));
    });
};

userSchema.statics.findUserById = function (id) {
  return this.findById(id)
    .then((user) => {
      if (user) return user;
      return Promise.reject(new NotFoundError('Пользователь с таким id не найден'));
    })
};


const User = mongoose.model('User', userSchema);

module.exports = User;