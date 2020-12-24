const { docClient } = require("../db/config");

exports.promisifyAWSScan = (params) => {
  return new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

exports.promisifyAWSQuery = (params) => {
  return new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
