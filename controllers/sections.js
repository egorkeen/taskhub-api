const { v4: uuid4 } = require("uuid");
const { setToDatabase, getFromDatabase} = require("../utils/database");
const { BOARDS } = require("../utils/constants/paths");

module.exports.createSection = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { sectionId } = req.params;

    const id = uuid4();

    const newSection = {
      title,
      id,
    };

    const result = await setToDatabase(`${BOARDS}/${sectionId}/sections/`, newSection);
    res.send(result);
  } catch (err) {
    console.error(err);
  }
};

module.exports.getSections = async (req, res, next) => {
  try {
    const { sectionId } = req.params;
    const columns = await getFromDatabase(`${BOARDS}/${sectionId}/columns`);
    res.send(columns);
  } catch (err) {
    console.error(err);
  };
};