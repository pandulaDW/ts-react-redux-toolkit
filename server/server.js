const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { initDb } = require("./db/initDB");
const { scanIndexHandler } = require("./handlers/handlers");
const { fetchRequestHandler } = require("./handlers/fetchHandler");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/lei/scrape/scanned-index", scanIndexHandler);
app.get("/lei/scrape/scrape-request", fetchRequestHandler);
app.get("/lei/scrape/init-data", fetchRequestHandler);

app.listen(5000, async () => {
  console.log(__dirname);
  await initDb();
  console.log("server started listening to requests at port 5000...");
});
