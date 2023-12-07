const { setToFirebase, getFromFirebase, patchToFirebase } = require('./firebase');

module.exports.setToDatabase = async (path, value) => {
  try {
    return setToFirebase(path, value);
  } catch (error) {
    console.error("Error setting data to database:", error);
    throw error;
  }
};

module.exports.patchToDatabase = async (value, path) => {
  try {
    return patchToFirebase(path, value);
  } catch (error) {
    console.error("Error setting data to database:", error);
    throw error;
  }
};

module.exports.getFromDatabase = async (path) => {
  try {
    return getFromFirebase(path);
  } catch (error) {
    console.error("Error getting data from database:", error);
    throw error;
  }
};