const { firebaseConfig } = require('./constants/firebase');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require("firebase/database");

const app = initializeApp(firebaseConfig);

const firebaseDb = getDatabase(app);

module.exports.setToFirebase = (path, value) => {
  const reference = ref(firebaseDb, path + '/' + value.id);
  // сделать абстракцию для возможного внедрения своей базы данных
  set(reference, value)
    .then((r) => r)
    .catch((err) => console.error(err));
};

module.exports.getFromFirebase = (path) => {
  return new Promise((resolve, reject) => {
    const distanceRef = ref(firebaseDb, path);
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
};
