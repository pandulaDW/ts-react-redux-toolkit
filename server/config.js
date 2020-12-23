const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-1" });

exports.dynamoDb = new AWS.DynamoDB({
  endpoint: "http://192.168.99.100:8000",
});

exports.tableData = {
  tableName: "lei-scrape-db",
  indexName: "lei-scrape-time-index",
  partitionKey: "timestamp",
  sortKey: "kfid",
};
