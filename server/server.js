const express = require("express");
const { initDb } = require("./initDB");

const app = express();

app.get("/", (req, res) => res.end("Server working"));

app.listen(5000, async () => {
  await initDb();
  console.log("server started listening to requests at port 5000...");
});
