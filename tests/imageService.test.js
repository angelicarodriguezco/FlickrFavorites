const imageService = require('../services/imageService');
const Image = require('../models/Image');
const User = require('../models/User');
const mockingoose = require('mockingoose');

jest.mock('jsonwebtoken');


describe('ImageService', () => {
    describe('Mark Favorite Photo', () => {
        test('It should mark a selected photo as favorite and save the URL', async () => {
            
            const mockUsername = 'mariarodri'
            const imageUrl = 'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg';

            const expectedResult = new Image({
                username: mockUsername,
                url: imageUrl,
            });

            mockingoose(Image).toReturn(expectedResult, 'save');

            
            const result = await imageService.markAsFavorite(
                'mariarodri',
                'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg',
            );


            expect(result.username).toBe(mockUsername);
            expect(result.url).toBe(imageUrl);
            expect(result.save).toHaveBeenCalled();
            expect(result.save).toHaveBeenCalledTimes(1);
        });

        test('It should handle errors', async () => {
            const mockUsername = 'mariarodri';
            const imageUrl = 'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg';

            mockingoose(Image).toReturn(new Error(), 'save');
            let result;
            try {
                await imageService.markAsFavorite(mockUsername, imageUrl);
              } catch (error) {
                result = error.message;
              }
              expect(result).toBe("Error marking image as favorite: ");
        });
    });

    describe('Get Favorite Photos', () => {
        test("It should return all favorite photos of a user", async () => {

            const mockUsername = 'mariarodri';
            const favoriteImages = [
                { username: mockUsername, url: 'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg', favorite: true},
                { username: mockUsername, url: 'https://live.staticflickr.com/65535/54252837741_d51e71d6a7_6k.jpg', favorite: true}
            ];
            mockingoose(Image).toReturn(favoriteImages, 'find');


            const result = await imageService.getFavorites(mockUsername);


            expect(result).toHaveLength(2);
            expect(result[0].url).toBe(favoriteImages[0].url);
            expect(result[1].url).toBe(favoriteImages[1].url);
        });
      
          test('It should handle errors properly', async () => {
            const mockUsername = 'mariarodri';

      
            mockingoose(Image).toReturn(new Error(''), 'find');

      
            let result;
            try {
                await imageService.getFavorites(mockUsername);
              } catch (error) {
                result = error.message;
              }
              expect(result).toBe("Error fetching favorite images: ");
        });
    });

    describe('Unmark Favorite Photo', () => {
        test('It should remove a selected photo as favorite', async () => {

            const mockUsername = 'mariarodri'
            const imageUrl = 'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg';

            const expectedResult = new Image({
                username: mockUsername,
                url: imageUrl,
                favorite: true
            });

            mockingoose(Image).toReturn(expectedResult, 'findOne');

            mockingoose(Image).toReturn({ acknowledged: true, deletedCount: 1 }, 'deleteOne');


            const result = await imageService.unmarkFavorite(
                'mariarodri',
                'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg',
            );


            expect(result).toBe(true);
        });
    });


    describe('Update Favorite Image', () => {
        test('It should update the title of the selected favorite image', async () => {
            const mockUsername = 'mariarodri';
            const imageUrl = 'https://live.staticflickr.com/65535/54276891887_7ed013c8a4_4k.jpg';
            const newTitle = 'Updated Title';
    
            const imageToUpdate = new Image({
                username: mockUsername,
                url: imageUrl,
                title: 'Old Title',
            });
    

            mockingoose(Image).toReturn(imageToUpdate, 'findOne');
    

            const updatedImage = { ...imageToUpdate.toObject(), title: newTitle };
            mockingoose(Image).toReturn(updatedImage, 'save');
    
            const result = await imageService.updateFavorite(mockUsername, imageUrl, newTitle);
    
            expect(result.username).toBe(mockUsername);
            expect(result.url).toBe(imageUrl);
            expect(result.title).toBe(newTitle);
            expect(result.save).toHaveBeenCalled();
        });
    });
});