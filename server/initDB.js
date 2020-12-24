const { dynamoDb, tableData } = require("./config");
const { promisfiedCreateTable } = require("./createDB");
const { putAllItems } = require("./loadData");

const promisifiedDropTable = () => {
  return new Promise((resolve, reject) => {
    dynamoDb.describeTable({ TableName: tableData.tableName }, (err, _) => {
      if (err) resolve();
      else {
        dynamoDb.deleteTable(
          { TableName: tableData.tableName },
          (err, data) => {
            if (err) reject(err);
            else {
              console.log("Existing table deleted");
              resolve(data);
            }
          }
        );
      }
    });
  });
};

exports.initDb = async () => {
  try {
    await promisifiedDropTable();
    await promisfiedCreateTable();
    putAllItems();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
