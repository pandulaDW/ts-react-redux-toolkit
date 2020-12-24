const cors = require("cors");
const express = require("express");
const { initDb } = require("./db/initDB");
const { scanIndexHandler } = require("./handlers/scanHandlers");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/lei/scrape/scanned-index", scanIndexHandler);

app.listen(5000, async () => {
  console.log(__dirname);
  await initDb();
  console.log("server started listening to requests at port 5000...");
});
