const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }
    
    await mongoose.connect('mongodb+srv://mariaangelica:ZpxQC4sakymhLiLL@flickrfavoritesapp.mmgba.mongodb.net/?retryWrites=true&w=majority&appName=FlickrFavoritesApp');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDB;
