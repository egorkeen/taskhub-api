const { v4: uuid4 } = require('uuid');
const { setToDatabase, getFromDatabase } = require("../utils/database");
const { BOARDS } = require('../utils/constants/paths');

module.exports.getTasks = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const tasks = await getFromDatabase(`${BOARDS}/${boardId}/tasks/`);
    res.send(tasks);
  } catch (err) {
    console.error(err);
  };
};

module.exports.createTask = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
    const { nickname: author } = req.user;
    const {
      title,
      description,
      deadline = null,
    } = req.body;

    const id = uuid4();
    const newTask = {
      title,
      description,
      author,
      columnId: columnId,
      implementer: null,
      deadline,
      id,
    };

    const result = await setToDatabase(`${BOARDS}/${boardId}/tasks/`, newTask);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};