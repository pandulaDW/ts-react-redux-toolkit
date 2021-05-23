const path = require("path");
const fs = require("fs");

const dataPath = path.join(process.cwd(), "server", "data", "requestData.json");
const data = fs.readFileSync(dataPath, "utf-8");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handleTimeoutResponse = async (_, res) => {
  const jsonData = JSON.parse(data);
  const waitingTime = 1000 + Math.floor(Math.random() * 2000);
  await timeout(waitingTime);

  // if (waitingTime > 15000) {
  //   return res.status(504).json({ error: "request timeout" });
  // }

  const index = Math.floor(Math.random() * jsonData.length);
  res.status(200).json({ data: jsonData[index] });
};

exports.handleDynamoResponse = async (req, res) => {};
