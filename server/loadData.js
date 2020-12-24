const fs = require("fs");
const { docClient, tableData } = require("./config");

const allItems = JSON.parse(fs.readFileSync("data.json", "utf8"));

const promisfiedPutData = (item) => {
  return new Promise((resolve, reject) => {
    docClient.put(
      { TableName: tableData.tableName, Item: item },
      function (err, data) {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
};

exports.putAllItems = () => {
  allItems.forEach(async (item) => {
    try {
      await promisfiedPutData(item);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
  console.log("Data inserted successfully");
};
