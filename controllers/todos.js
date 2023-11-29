const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyDUz6oMzefWPRmOHgyYrlDncftkYK_5OjM",
  authDomain: "taskhub-ab44e.firebaseapp.com",
  databaseURL: "https://taskhub-ab44e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "taskhub-ab44e",
  storageBucket: "taskhub-ab44e.appspot.com",
  messagingSenderId: "868526558228",
  appId: "1:868526558228:web:df79be400f0b2e81102b01"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const distanceRef = ref(database, 'todos');
module.exports.createTodo = (req, res, next) => {

  const { title, id, owner } = req.body;
  const newTodo = { title, id, owner };
  const reference = ref(database, 'todos/' + id);

  set(reference, newTodo).then((r) => res.send(r));
};

module.exports.getTodos = (req, res, next) => {
  const { userId } = req.body;
  onValue(distanceRef, (snapshot) => {
    const data = snapshot.val();
    res.send(data);
  });
};