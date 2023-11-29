const userRouter = require('express').Router();
const { signUp, signIn } = require('../controllers/users');
const { celebrateSignUp, celebrateSignIn } = require('../middlewares/celebrate');

userRouter.post('/sign-up', celebrateSignUp, signUp);
userRouter.post('/sign-in', celebrateSignIn, signIn);

module.exports = userRouter;