const fs = require("fs");
const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-southeast-1" });

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint: "http://192.168.99.100:8000",
});

dynamoDb.createTable(
  {
    TableName: "lei-scrape-db",
    KeySchema: [
      { AttributeName: "timestamp", KeyType: "HASH" }, // Partition key
      { AttributeName: "kfid", KeyType: "RANGE" }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "timestamp", AttributeType: "N" },
      { AttributeName: "kfid", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      WriteCapacityUnits: 10,
      ReadCapacityUnits: 10,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: "lei-scrape-time-index",
        Projection: {
          ProjectionType: "KEYS_ONLY",
        },
        ProvisionedThroughput: {
          WriteCapacityUnits: 10,
          ReadCapacityUnits: 10,
        },
        KeySchema: [
          {
            KeyType: "HASH",
            AttributeName: "timestamp",
          },
        ],
      },
    ],
  },
  (err, data) => {
    if (err)
      console.error(
        "Unable to create table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    else
      console.log(
        "Created table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
  }
);
