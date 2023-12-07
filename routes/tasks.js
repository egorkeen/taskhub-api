const tasksRouter = require('express').Router();
const { createTask, getTasks } = require("../controllers/tasks");
const { celebrateCreateTask } = require('../middlewares/celebrate/celebrate-tasks');
const auth = require('../middlewares/auth');

tasksRouter.post('/boards/:boardId/sections/:sectionId/', auth, celebrateCreateTask, createTask);
tasksRouter.get('boards/:boardId/sections/:sectionId/', auth, getTasks);

module.exports = tasksRouter;