const Photo = require('./photosModel');

exports.get = (req, res) => {
  const perPage = parseInt(req.query.perPage) || 10
  , page = parseInt(req.query.page)

  Photo.find()
    .limit(perPage)
    .skip(perPage * ( page - 1))
    .sort({
        id: 'asc'
    })
    .exec(function(err, photos) {
      Photo.countDocuments().exec(function(err, count) {
          res.send({
            photos,
            page,
            pageNumber: count / perPage
          })
      })
  })

};