const fs = require("fs");
const _ = require('lodash');


function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

exports.get = (req, res) => {
  console.log(req.query.page)
  fs.readFile(__dirname + "/photos.json", "UTF8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const newData = paginate(JSON.parse(data), parseInt(req.query.page), 10 );
    res.send(newData);
  });
};