// Initial load of the latest data

const AWS = require("aws-sdk");
AWS.config.update({
  region: "ap-southeast-1",
});

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://192.168.99.100:8000",
});

const TableName = "lei-scrape-db";
const IndexName = "lei-scrape-time-index";

const promisifyAWSQuery = (params) =>
  new Promise((resolve, reject) => {
    docClient.query(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const promisifyAWSScan = (params) =>
  new Promise((resolve, reject) => {
    docClient.scan(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const queryParams = (maxTimestamp) => ({
  TableName,
  KeyConditionExpression: "#tm = :maxTimestamp",
  ExpressionAttributeNames: {
    "#tm": "timestamp",
  },
  ExpressionAttributeValues: {
    ":maxTimestamp": maxTimestamp,
  },
});

const executePromise = async () => {
  try {
    const scannedData = await promisifyAWSScan({
      TableName,
      IndexName,
    });
    const maxTimestamp = scannedData.Items.reduce(
      (acc, curr) => Math.max(acc, curr.timestamp),
      0
    );
    const data = await promisifyAWSQuery(queryParams(maxTimestamp));
    data.Items.forEach(function (item) {
      console.log(item.company_name.uv_value);
    });
    console.log("Finished Query");
  } catch (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  }
};

executePromise();
