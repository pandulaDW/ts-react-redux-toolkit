const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
// const { initDb } = require("./db/initDB");
const {
  scanIndexHandler,
  fetchRequestHandler,
  readInitData,
} = require("./handlers/handlers");

const { handleTimeoutResponse } = require("./handlers/timeoutFuncs");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/lei/scrape/scanned-index", scanIndexHandler);
app.get("/lei/scrape/scrape-request", fetchRequestHandler);
app.get("/lei/scrape/init-data", readInitData);
app.get("/lei/scrape/upload-file", handleTimeoutResponse);

app.listen(4000, async () => {
  // await initDb();
  console.log("server started listening to requests at port 4000...");
});
