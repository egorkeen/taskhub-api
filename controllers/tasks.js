const { v4: uuid4 } = require('uuid');
const { setToDatabase } = require("../utils/database");
const { BOARDS } = require('../utils/constants/paths');

module.exports.getTasks = (req, res, next) => {

};

module.exports.createTask = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const {
      title,
      description,
      author,
      implementer = null,
      deadline = null,
    } = req.body;

    const id = uuid4();
    const newTask = {
      title,
      description,
      author,
      implementer,
      deadline,
      id,
    };

    const result = await setToDatabase(`${BOARDS}/${boardId}/tasks`);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};