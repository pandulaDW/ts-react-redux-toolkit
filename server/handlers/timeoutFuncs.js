const path = require("path");
const fs = require("fs");

const dataPath = path.join(process.cwd(), "server", "data", "requestData.json");
const data = fs.readFileSync(dataPath, "utf-8");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handleTimeoutResponse = async (req, res) => {
  const { requestId, timestamp } = req.body;
  const jsonData = JSON.parse(data);
  const waitingTime = 5000 + Math.floor(Math.random() * 15000);
  await timeout(waitingTime);
  const index = Math.floor(Math.random() * jsonData.length);
  res.status(200).json({ requestId, data: jsonData[index], timestamp });
};
