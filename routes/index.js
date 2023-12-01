const router = require('express').Router();

const userRouter = require('./users');
const boardsRouter = require('./boards');

router.use(userRouter);
router.use(boardsRouter);

module.exports = router;