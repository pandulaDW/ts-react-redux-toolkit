const { dynamoDb, tableData } = require("./config");

const tableConfig = {
  TableName: tableData.tableName,
  KeySchema: [
    { AttributeName: tableData.partitionKey, KeyType: "HASH" }, // Partition key
    { AttributeName: tableData.sortKey, KeyType: "RANGE" }, // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: tableData.partitionKey, AttributeType: "N" },
    { AttributeName: tableData.sortKey, AttributeType: "S" },
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
          AttributeName: tableData.partitionKey,
        },
      ],
    },
  ],
};

exports.promisfiedCreateTable = () => {
  return new Promise((resolve, reject) => {
    dynamoDb.createTable(tableConfig, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
