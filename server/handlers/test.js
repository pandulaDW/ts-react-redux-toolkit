const setTimeoutPromise = (counter) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000 * counter);
  });
};

exports.testHandler = async (req, res) => {
  res.end("Response sent");

  const timeout = setInterval(() => {
    console.log("Scraping on progress");
  }, 1000);

  await setTimeoutPromise(10);
  clearInterval(timeout);
  console.log("Request finished processing");
};
