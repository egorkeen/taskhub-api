const tasksRouter = require('express').Router();
const { createTask, getTasks } = require("../controllers/tasks");
const { celebrateCreateTask } = require('../middlewares/celebrate/celebrate-tasks');
const auth = require('../middlewares/auth');

tasksRouter.post('/boards/:boardId/columns/:columnId/', auth, celebrateCreateTask, createTask);
tasksRouter.get('boards/:boardId/columns/:columnId/', auth, getTasks);

module.exports = tasksRouter;