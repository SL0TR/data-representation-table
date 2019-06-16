const fs = require("fs");

exports.get = (req, res) => {
  fs.readFile(__dirname + "/photos.json", "UTF8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.parse(data));
  });
};