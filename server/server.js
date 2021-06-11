const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
// const { initDb } = require("./db/initDB");
const {
  scanIndexHandler,
  fetchRequestHandler,
  readInitData,
  handleFileUpload,
} = require("./handlers/handlers");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.get("/lei/scrape/scanned-index", scanIndexHandler);
app.get("/lei/scrape/scrape-request", fetchRequestHandler);
app.get("/lei/scrape/init-data", readInitData);
app.post("/lei/scrape/upload-file", handleFileUpload);

app.listen(4000, async () => {
  // await initDb();
  console.log("server started listening to requests at port 4000...");
});
