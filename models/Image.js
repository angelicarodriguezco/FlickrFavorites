const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled' },
});


const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

module.exports = Image;
