const { v4: uuid4 } = require("uuid");
const {setToDatabase} = require("../utils/database");
const {BOARDS} = require("../utils/constants/paths");

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

module.exports.getColumns = (req, res, next) => {

};