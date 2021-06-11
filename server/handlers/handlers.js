const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
const _ = require("underscore");

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
    const maxTimestamp = scannedData["Items"].reduce(
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

const dataPath = path.join(process.cwd(), "server", "data", "results.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.readInitData = async (req, res) => {
  await timeout(1000);
  const indices = [];
  for (let i = -1; i < data["data"].length; i++) {
    indices.push(i + 1);
  }
  const randomIndicesSample = _.take(_.shuffle(indices), 5);
  const returnedData = randomIndicesSample.map((idx) => data["data"][idx]);

  const responseObj = {
    data: returnedData,
    timestamp: Date.now(),
    fieldList: fieldList,
  };

  res.status(200).json(responseObj);
};

exports.handleFileUpload = async (req, res) => {
  const waitingTime = 1000 + Math.floor(Math.random() * 4000);
  await timeout(waitingTime);

  const wb = XLSX.read(req.body.content, {
    type: "base64",
  });

  const wsName = wb.SheetNames[0];
  const ws = wb.Sheets[wsName];

  const content = XLSX.utils.sheet_to_json(ws);
  const kfids = content.map((item) => item["keyfieldvalue"].toString());

  const relevantData = data["data"].filter((item) => {
    return kfids.includes(item["kfid"]);
  });

  return res.status(200).json({ data: relevantData });
};
