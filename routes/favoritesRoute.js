const express = require('express');
const { markAsFavorite, getFavorites, unmarkFavorite, updateFavorite } = require('../services/imageService');

const router = express.Router();

router.post('/favorites', async (req, res) => {
    const { username, imageUrl, title } = req.body;
    try {
      const image = await markAsFavorite(username, imageUrl, title);
      res.status(200).json({
        message: 'Image successfully marked as favorite',
        image,
      });
    } catch (error) {
      console.error('Error marking image as favorite:', error);
      res.status(500).json({ message: 'Error marking image as favorite', error: error.message });
    }
  });


  router.get('/favorites/:username', async (req, res) => {
    const username = req.params.username;
    try {
      const favorites = await getFavorites(username);
      res.status(200).json(favorites);
    } catch (error) {
      console.error('Error fetching favorite images:', error);
      res.status(500).json({ message: 'Error fetching favorite images', error: error.message });
    }
  });
  
  
  router.delete('/favorites', async (req, res) => {
    const { username, imageUrl } = req.body;
    try {
      const result = await unmarkFavorite(username, imageUrl);
      if (result) {
        res.status(200).json({ message: 'Image successfully unmarked as favorite' });
      }
    } catch (error) {
      console.error('Error unmarking image as favorite:', error);
      res.status(500).json({ message: 'Error unmarking image as favorite', error: error.message });
    }
  });


  router.put('/favorites', async(req, res) => {
    const { username, imageUrl, newTitle} = req.body;
    try {
      const result = await updateFavorite(username, imageUrl, newTitle);
      if (result) {
        res.status(200).json({ message: 'Image title successfully changed' });
      }
    } catch (error) {
      console.error('Error changing image title:', error);
      res.status(500).json({ message: 'Error changing image title', error: error.message });
    }
  })
  
  module.exports = router;