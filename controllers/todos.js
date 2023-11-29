const { setToDatabase, getFromDatabase } = require('../utils/database');
const { todos } = require('../utils/constants');

module.exports.createTodo = async (req, res, next) => {
  const { title, id, owner } = req.body;

  const newTodo = { title, id, owner };
  const result = await setToDatabase(todos, newTodo);
  res.send(result);
};

module.exports.getTodos = async (req, res, next) => {
  const result = await getFromDatabase(todos);
  res.send(result);
};