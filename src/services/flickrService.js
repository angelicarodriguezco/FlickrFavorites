const apiKey = "426b851b1c5883e41e0403fa08f710ae";

export const getPhotos = (search_term) => {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${search_term}&sort=date-posted-desc&format=json&nojsoncallback=1&per_page=100&safe_search=1`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data.photos.photo;
    })
    .catch((error) => {
      console.error("Error fetching images: " + error);
      return [];
    });
};
