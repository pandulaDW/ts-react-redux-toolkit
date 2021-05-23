const path = require("path");
const fs = require("fs");

const dataPath = path.join(process.cwd(), "server", "data", "requestData.json");
const data = fs.readFileSync(dataPath, "utf-8");
const jsonData = JSON.parse(data);

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handleTimeoutResponse = async (_, res) => {
  const waitingTime = 1000 + Math.floor(Math.random() * 4000);
  await timeout(waitingTime);

  if (waitingTime > 2000) {
    return res.status(504).json({ error: "request timeout" });
  }

  const index = Math.floor(Math.random() * jsonData.length);
  res.status(200).json({ data: jsonData[index] });
};

exports.handleDynamoResponse = async (req, res) => {
  // const { requestId } = req.body;
  const index = Math.floor(Math.random() * jsonData.length);

  if (Math.floor(Math.random() * 10) === 5) {
    return res.status(200).json({ data: jsonData[index] });
  }

  res.status(200).json({ data: {} });
};
