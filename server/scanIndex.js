// Scan the time index

const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
});

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://192.168.99.100:8000",
});

const TableName = "lei-scrape-db";
const IndexName = "lei-scrape-time-index";

const promisifyAWSScan = (params) =>
  new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const executePromise = async () => {
  try {
    const scannedData = await promisifyAWSScan({
      TableName,
      IndexName,
    });
    console.log(scannedData);
    console.log("Finished Query");
  } catch (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  }
};

executePromise();
