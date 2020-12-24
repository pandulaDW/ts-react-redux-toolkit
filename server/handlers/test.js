exports.testHandler = async (req, res) => {
  // TODOs
  // Read data file from request and pick random set of data

  res.end("Response sent"); // Send back data (timestamp plus kfid)

  let counter = 1;
  const timeout = setInterval(() => {
    console.log("Scraping on progress", counter); // Put request (timestamp plus kfid)
    counter++;
    if (counter > 10) clearInterval(timeout); // clear interval when all data has been inserted
  }, 2000);
};
