const path = require("path");
var fs = require("fs").promises;

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.handleTimeoutResponse = async (_, res) => {
  const dataPath = path.join(process.cwd(), "server", "data", "loadData.json");
  const data = await fs.readFile(dataPath, "utf-8");
  const jsonData = JSON.parse(data);
  const waitingTime = 5000 + Math.floor(Math.random() * 15000);
  await timeout(waitingTime);
  const index = Math.floor(Math.random() * jsonData.length);
  return res.json(jsonData[index]);
};
