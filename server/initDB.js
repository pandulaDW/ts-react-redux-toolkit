const { promisfiedCreateTable } = require("./createDB");
const { putAllItems } = require("./loadData");

exports.initDb = async () => {
  try {
    await promisfiedCreateTable();
    console.log("Table successfully created");
    putAllItems();
    console.log("Data inserted successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
