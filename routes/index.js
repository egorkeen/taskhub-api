const router = require('express').Router();

const userRouter = require('./users');
const boardsRouter = require('./boards');
const sectionsRouter = require('./sections');
const tasksRouter = require('./tasks');

router.use(userRouter);
router.use(boardsRouter);
router.use(sectionsRouter);
router.use(tasksRouter);

module.exports = router;