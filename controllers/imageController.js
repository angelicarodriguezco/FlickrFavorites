const imageService = require('../services/imageService');

const imageController = {

  async markAsFavorite(req, res) {
    const { username } = req.params;
    const { imageUrl } = req.body;
    try {
      const image = await imageService.markAsFavorite(username, imageUrl);
      res.status(201).json({ message: 'Image marked as favorite successfully', image});
    } catch (error) {
      res.status(400).json({ message: 'Error marking image as favorite', error: error.message});
    }
  },


  async getFavorites(req, res) {
    const { username } = req.params;
    try {
      const favorites = await imageService.getFavorites(username);
      res.status(200).json({ message: 'Favorite images retrieved successfully', favorites});
    } catch (error) {
      res.status(400).json({ message: 'Error fetching favorite images', error: error.message});
    }
  },


  async unmarkFavorite(req, res) {
    const { username } = req.params;
    const { imageUrl } = req.body;
    try {
      const image = await imageService.unmarkFavorite(username, imageUrl);
      res.status(200).json({ message: 'Image unmarked from favorites successfully',image});
    } catch (error) {
      res.status(400).json({ message: 'Error unmarking image from favorites', error: error.message});
    }
  },


  async updateFavorite(req, res) {
    const { username } = req.params;
    const { imageUrl } = req.body;
    try {
      const image = await imageService.updateFavorite(username, imageUrl);
      res.status(200).json({ message: 'Image updated to favorite successfully', image});
    } catch (error) {
      res.status(400).json({ message: 'Error updating image to favorite', error: error.message});
    }
  },
};

module.exports = imageController;
