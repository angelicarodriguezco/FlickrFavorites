const Image = require('../models/Image');

const imageService = {

  async markAsFavorite(username, imageUrl, title) {
    try {
      const existingImage = await Image.findOne({ username, url: imageUrl });
      if (existingImage) {
        return existingImage;
      }
      const image = new Image({ username, url: imageUrl, title });
      await image.save();
      return image;
    } catch (error) {
      throw new Error('Error marking image as favorite: ' + error.message);
    }
  },


  async getFavorites(username) {
    try {
      const hardcodedUsername = 'mariarodri';
      const favorites = await Image.find({ username: hardcodedUsername });
      return favorites;
    } catch (error) {
      throw new Error('Error fetching favorite images: ' + error.message);
    }
  },


  async unmarkFavorite(username, imageUrl) {
    try {
      const image = await Image.findOneAndDelete({ username, url: imageUrl });
      if (!image) {
        return true;
      }
      image.deleteOne()
      return true;
    } catch (error) {
      throw new Error('Error unmarking image as favorite: ' + error.message);
    }
  },


  async updateFavorite(username, imageUrl, newTitle) {
    try {
      const image = await Image.findOne({ username, url: imageUrl });
      if (!image) {
        throw new Error('Image not found');
      }
      image.title = newTitle;
      await image.save();
      return image;
    } catch (error) {
      throw new Error('Error updating image as favorite: ' + error.message);
    }
  },
};

module.exports = imageService;
