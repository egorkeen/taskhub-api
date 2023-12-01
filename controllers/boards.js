const { setToDatabase, getFromDatabase } = require('../utils/database');
const { boards } = require('../utils/constants/paths');
const { v4: uuid4 } = require('uuid');

module.exports.createBoard = async (req, res, next) => {
  try {
    const {
      title,
      description,
      owner,
      style,
      date,
    } = req.body;

    const id = await uuid4();
    const users = [];
    const lists = [];
    const newBoard = {
      id,
      title,
      description,
      owner,
      style,
      users,
      // shareLink
      lists,
    };
    const result = await setToDatabase(boards, newBoard);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUserBoards = (req, res, next) => {
  const { nickname } = req.user;
  const allBoards = getFromDatabase(boards);
  if (allBoards) {
    const boardsArr = Object.values(allBoards);
    const userBoards = boardsArr.filter((board) => board.owner === nickname);
    res.send(userBoards);
  };
};