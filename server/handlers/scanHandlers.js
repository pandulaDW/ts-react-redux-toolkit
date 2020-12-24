const { docClient, tableData } = require("../db/config");

const promisifyAWSScan = (params) =>
  new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

exports.scanIndexHandler = async (req, res) => {
  try {
    const scannedData = await promisifyAWSScan({
      TableName: tableData.tableName,
      IndexName: tableData.IndexName,
    });
    res.status(200).json(scannedData);
  } catch (err) {
    res.status(400).json(err);
  }
};
