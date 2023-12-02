const router = require('express').Router();

const userRouter = require('./users');
const boardsRouter = require('./boards');
const tasksRouter = require('./tasks');

router.use(userRouter);
router.use(boardsRouter);
router.use(tasksRouter);

module.exports = router;