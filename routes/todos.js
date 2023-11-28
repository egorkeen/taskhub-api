const todosRouter = require('express').Router();

const { createTodo, getTodos } = require('../controllers/todos.js');

todosRouter.post('/todos', createTodo);
todosRouter.get('/todos', getTodos);

module.exports = todosRouter;
