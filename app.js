const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();

const { DB_URL = 'mongodb://127.0.0.1/taskhubdb' } = process.env;
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());
app.use(routes);

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`Сервер запущен. Порт: ${PORT}`);
});