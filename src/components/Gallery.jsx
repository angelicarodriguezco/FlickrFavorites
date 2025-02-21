import React, { useState, useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { getPhotos } from "../services/flickrService";
import "../styles/list-style.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [successMessages, setSuccessMessages] = useState("");

  useEffect(() => {
    getPhotos().then((photos) => setPhotos(photos));
  }, []);

  const handleImageClick = (photo) => {
    const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
    setSelectedPhoto({ ...photo, imgUrl });
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  const handleFavorite = (photo) => {
    const token = localStorage.getItem("token");
    console.log(JSON.stringify(photo));
    if (!token) {
      //console.log("No token found, please login first.");
     // return;
    }
    const imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;

    fetch("http://localhost:3001/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ imageUrl: imageUrl, username: 'mariarodri', title: photo.title }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image added to favorites:", data);
        setFavorites((prevFavorites) => [...prevFavorites, photo]);
        setSuccessMessages((prevMessages) => ({
          ...prevMessages,
          [photo.id]: "Added to favorites!",
        }));

        setTimeout(() => {
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            [photo.id]: "",
          }));
        }, 3000);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="gallery">
      <h1>Flickr Image Browser</h1>
      <div className="image-list">
        {photos.length > 0 ? (
          photos.map((photo) => {
            const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
            return (
              <div key={photo.id} className="image-div">
                <img
                  src={imgUrl}
                  alt={photo.title}
                  className="image-item"
                  onClick={() => handleImageClick(photo)}
                />
                <Button onClick={() => handleFavorite(photo)}
                  variant='contained'
                  color='secondary'
                  startIcon={<FavoriteIcon></FavoriteIcon>}></Button>
                {successMessages[photo.id] && (
                    <span className="success-message">{successMessages[photo.id]}</span>
                  )}
              </div>
            );
          })
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      {selectedPhoto && (
        <div className="modal" style={{ display: "block" }} onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedPhoto.imgUrl} alt={selectedPhoto.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
