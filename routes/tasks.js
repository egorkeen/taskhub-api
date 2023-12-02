const tasksRouter = require('express').Router();
const { createTask } = require("../controllers/tasks");
const { celebrateCreateTask } = require('../middlewares/celebrate/celebrate-tasks');
const auth = require('../middlewares/auth');

tasksRouter.post('/boards/:boardId/:columnId/', auth, celebrateCreateTask, createTask);

module.exports = tasksRouter;