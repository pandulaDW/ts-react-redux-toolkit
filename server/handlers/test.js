const path = require("path");
const fs = require("fs");

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

exports.testHandler = async (req, res) => {
  const requestData = [];

  genRandomNums(10).forEach((index) => {
    requestData.push(allData[index]);
  });

  // Sending back data (timestamp plus kfid)
  res.json({
    timestamp: new Date().getTime(),
    kfids: requestData.map((el) => el.kfid),
  });

  // let counter = 1;
  // const timeout = setInterval(() => {
  //   console.log("Scraping on progress", counter); // Put request (timestamp plus kfid)
  //   counter++;
  //   if (counter > 10) clearInterval(timeout); // clear interval when all data has been inserted
  // }, 2000);
};
