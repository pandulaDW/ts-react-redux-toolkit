const { tableData } = require("../db/config");
const { promisifyAWSScan, promisifyAWSQuery } = require("./promisfiedFuncs");

const fieldList = [
  "entity_number",
  "company_name",
  "company_status",
  "company_type",
  "previous_name",
  "address",
];

const queryParams = (receivedTimestamp) => ({
  TableName: tableData.tableName,
  KeyConditionExpression: "#tm = :receivedTimestamp",
  ExpressionAttributeNames: {
    "#tm": "timestamp",
  },
  ExpressionAttributeValues: {
    ":receivedTimestamp": parseInt(receivedTimestamp),
  },
});

const scanParams = {
  TableName: tableData.tableName,
  IndexName: tableData.IndexName,
  ProjectionExpression: "kfid, #tm",
  ExpressionAttributeNames: { "#tm": "timestamp" },
};

exports.scanIndexHandler = async (_, res) => {
  try {
    const scannedData = await promisifyAWSScan(scanParams);
    res.status(200).json(scannedData);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchRequestHandler = async (req, res) => {
  const { timestamp } = req.query;
  try {
    const data = await promisifyAWSQuery(queryParams(timestamp));
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.scanAndFetchHandler = async (_, res) => {
  try {
    const scannedData = await promisifyAWSScan(scanParams);
    const maxTimestamp = scannedData.Items.reduce(
      (acc, curr) => Math.max(acc, curr.timestamp),
      0
    );
    const data = await promisifyAWSQuery(queryParams(maxTimestamp));
    data["fieldList"] = fieldList;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};
