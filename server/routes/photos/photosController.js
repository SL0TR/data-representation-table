const fs = require("fs");
const _ = require('lodash');


function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

exports.get = (req, res) => {
  fs.readFile(__dirname + "/photos.json", "UTF8", (err, data) => {
    if (err) {
      console.log(err);
    }
    const parsedData = JSON.parse(data);
    const photos = paginate(parsedData, parseInt(req.query.page), 10 );
    res.send(
      {
        photos,
        itemsNumber: parsedData.length / 10
      }
    );
  });
};