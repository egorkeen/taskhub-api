const router = require('express').Router();

const userRouter = require('./users');
const todosRouter = require('./todos');

router.use(userRouter);
router.use(todosRouter);

module.exports = router;