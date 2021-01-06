const path = require("path");
const fs = require("fs");
const { promisfiedPutData } = require("../db/loadData");

const filepath = path.join(__dirname, "..", "data", "requestData.json");
const allData = JSON.parse(fs.readFileSync(filepath, "utf-8"));

const range = (end, start = 0, step = 1) => {
  const seq = [];
  for (let index = start; index < end; index += step) {
    seq.push(index);
  }
  return seq;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const genRandomNums = (limit) => {
  const seq = range(allData.length);
  shuffleArray(seq);
  return seq.slice(0, limit);
};

exports.putItemsHandler = async (req, res) => {
  const requestData = [];
  const timestamp = new Date().getTime();

  genRandomNums(10).forEach((index) => {
    const item = allData[index];
    item["timestamp"] = timestamp;
    requestData.push(item);
  });

  const kfids = requestData.map((el) => el.kfid);

  // Sending back data (timestamp plus kfid)
  res.json({ timestamp, kfids });

  let counter = 0;
  const timeout = setInterval(async () => {
    try {
      await promisfiedPutData(requestData[counter]);
    } catch (err) {
      console.error(err);
    }
    counter++;
    // clearing the interval when all data has been inserted
    if (counter >= 10) clearInterval(timeout);
  }, 1500);
};
