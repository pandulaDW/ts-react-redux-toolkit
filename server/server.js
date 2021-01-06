const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { initDb } = require("./db/initDB");
const {
  scanIndexHandler,
  fetchRequestHandler,
  scanAndFetchHandler,
} = require("./handlers/handlers");
const { putItemsHandler } = require("./handlers/postRequest");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/lei/scrape/scanned-index", scanIndexHandler);
app.get("/lei/scrape/scrape-request", fetchRequestHandler);
app.get("/lei/scrape/init-data", scanAndFetchHandler);
app.get("/lei/scrape/upload-file", putItemsHandler);

app.listen(5000, async () => {
  await initDb();
  console.log("server started listening to requests at port 5000...");
});
