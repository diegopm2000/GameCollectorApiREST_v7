// dbconnection.bootstrap.js

async function connectToMongoDB() {
  return new Promise((resolve) => {
    resolve(true);
  });
}

module.exports = {
  connectToMongoDB,
};
