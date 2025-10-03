const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  username: { type: String, ref: 'User', required: true },
  title: {type: String}
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
