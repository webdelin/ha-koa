exports.add = ({name, email, message}) => new Promise(async (resolve, reject) => {
  try {
    if (!name) {
      reject('Name are required');
      return;
    }
    if (!email) {
      reject('Email are required');
      return;
    }
    if (!message) {
      reject('Message are required');
      return;
    }
    resolve(true);
  }
  catch(err) {
    reject(err);
  }
});
