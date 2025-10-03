const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mariaangelica:ZpxQC4sakymhLiLL@flickrfavoritesapp.mmgba.mongodb.net/?retryWrites=true&w=majority&appName=FlickrFavoritesApp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDB;
