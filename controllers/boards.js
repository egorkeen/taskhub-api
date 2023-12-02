const { setToDatabase, getFromDatabase } = require('../utils/database');
const { BOARDS } = require('../utils/constants/paths');
const { v4: uuid4 } = require('uuid');
const User = require('../models/User');

module.exports.createBoard = async (req, res, next) => {
  try {
    const { title, description, owner, style, date } = req.body;
    const { uid } = req.cookies;

    // id доски
    const id = uuid4();
    const users = [];
    // добавляем создателя в список пользователей доски
    users.push(uid);

    // создаем доску
    const newBoard = { id, title, description, owner, style, users, date };

    const result = await setToDatabase(BOARDS, newBoard);

    // после того как мы получили успешно доски, добавляем id доски в поле usersBoardsIds
    const user = await User.findUserById(uid);
    user.userBoardsIds.push(id);
    await user.save();

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
    const board = await getFromDatabase(`${BOARDS}/${boardId}`);
    console.log(board);
    promiseArr.push(board);
  };
  const userBoards = await Promise.all(promiseArr);
  res.send(userBoards);
};