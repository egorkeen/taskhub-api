const tasksRouter = require('express').Router();
const { celebrateCreateTask } = require('../middlewares/celebrate/celebrate-tasks');
const { createTask } = require("../controllers/tasks");
const { auth } = require('../middlewares/auth');

tasksRouter.get('/:boardId', auth, celebrateCreateTask, createTask);