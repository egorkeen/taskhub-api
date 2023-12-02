const { firebaseConfig } = require('./constants/firebase');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require("firebase/database");

const app = initializeApp(firebaseConfig);

const firebaseDb = getDatabase(app);

function getFromFirebase (path) {
  return new Promise((resolve, reject) => {
    const distanceRef = ref(firebaseDb, path);
    onValue(distanceRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    }, (error) => {
      reject(error);
      console.error(error);
    });
  });
};

async function setToFirebase (path, value) {
  try {
    const reference = ref(firebaseDb, `${path}/${value.id}`);
    await set(reference, value);
    const result = await getFromFirebase(path);
    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getFromFirebase, setToFirebase };
