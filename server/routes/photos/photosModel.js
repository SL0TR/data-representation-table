const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotosSchema = new Schema({
  albumId: Number,
  id: Number,
  title: String,
  url: String,
  thumbnailUrl: String
}, {collection: 'photos'});

module.exports = mongoose.model('photos', PhotosSchema);