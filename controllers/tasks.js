const { v4: uuid4 } = require('uuid');
const { setToDatabase, getFromDatabase } = require("../utils/database");
const { BOARDS } = require('../utils/constants/paths');

// module.exports.getTasks = async (req, res, next) => {
//   try {
//     const { boardId, columnId } = req.params;
//     const tasks = await getFromDatabase(`${BOARDS}/${boardId}/columns/${columnId}/tasks/`);
//     res.send(tasks);
//   } catch (err) {
//     console.error(err);
//   };
// };

module.exports.createTask = async (req, res, next) => {
  try {
    const { boardId, columnId } = req.params;
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

    const result = await setToDatabase(`${BOARDS}/${boardId}/columns/${columnId}/tasks/`, newTask);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};