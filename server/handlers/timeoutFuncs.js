const path = require("path");
var fs = require("fs");

const dataPath = path.join(process.cwd(), "server", "data", "loadData.json");
const data = fs.readFileSync(dataPath, "utf-8");

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handleTimeoutResponse = async (req, res) => {
  const requestId = req.body.requestId;
  const jsonData = JSON.parse(data);
  const waitingTime = 5000 + Math.floor(Math.random() * 15000);
  await timeout(waitingTime);
  const index = Math.floor(Math.random() * jsonData.length);
  res.status(200).json({ requestId, content: jsonData[index] });
};
