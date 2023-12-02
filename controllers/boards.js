const { setToDatabase, getFromDatabase } = require('../utils/database');
const { BOARDS } = require('../utils/constants/paths');
const { v4: uuid4 } = require('uuid');
const User = require('../models/User');

module.exports.createBoard = async (req, res, next) => {
  try {
    const {
      title,
      description,
      owner,
      style,
      date,
    } = req.body;

    const id = uuid4();
    const users = [];
    // users.push(id пользователя)
    const newBoard = {
      id,
      title,
      description,
      owner,
      style,
      users,
      date
    };
    const result = await setToDatabase(BOARDS, newBoard);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getUserBoards = async (req, res, next) => {
  const { uid } = req.cookies;

  const user = await User.findUserById(uid)
  const { userBoardsIds = [] } = user;
  const promiseArr = [];
  for (const boardId of userBoardsIds) {
    promiseArr.push(getFromDatabase(`${BOARDS}/${boardId}`));
  };
  const userBoards = await Promise.all(promiseArr);
  res.send(userBoards);
};