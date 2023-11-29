const { setToFirebase, getFromFirebase } = require('./firebase');

module.exports.setToDatabase = async (path, value) => {
  try {
    const result = await setToFirebase(path, value);
    return result;
  } catch (error) {
    console.error("Error setting data to database:", error);
    throw error;
  }
};

module.exports.getFromDatabase = async (path) => {
  try {
    const result = await getFromFirebase(path);
    return result;
  } catch (error) {
    console.error("Error getting data from database:", error);
    throw error;
  }
};