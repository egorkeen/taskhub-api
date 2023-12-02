const router = require('express').Router();

const userRouter = require('./users');
const boardsRouter = require('./boards');
const columnsRouter = require('./columns');
const tasksRouter = require('./tasks');

router.use(userRouter);
router.use(boardsRouter);
router.use(columnsRouter);
router.use(tasksRouter);

module.exports = router;