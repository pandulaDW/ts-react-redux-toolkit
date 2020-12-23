const allItems = JSON.parse(fs.readFileSync("data.json", "utf8"));

allItems.forEach(function (item) {
  var params = {
    TableName: "lei-scrape-db",
    Item: item,
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.error("Unable to add item", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", item.company_name.uv_value);
    }
  });
});
