const { v4: uuid4 } = require("uuid");
const { setToDatabase, getFromDatabase} = require("../utils/database");
const { BOARDS } = require("../utils/constants/paths");

module.exports.createColumn = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { boardId } = req.params;

    const id = uuid4();

    const newColumn = {
      title,
      id,
    };

    const result = await setToDatabase(`${BOARDS}/${boardId}/columns/`, newColumn);
    res.send(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports.getColumns = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const columns = await getFromDatabase(`${BOARDS}/${boardId}/columns`);
    res.send(columns);
  } catch (err) {
    console.error(err);
  };
};