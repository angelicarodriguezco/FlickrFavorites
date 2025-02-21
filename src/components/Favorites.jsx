import React, { useState, useEffect } from "react";
import "../styles/list-style.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
  
    useEffect(() => {
      fetch("http://localhost:3001/api/favorites/mariarodri")
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched data:", data);
          if (Array.isArray(data)) {
            setFavorites(data);
          } else {
            setError(data.error || "Failed to load favorites.");
          }
        })
        .catch((err) => {
          setError("An error occurred: " + err.message);
        });
    }, []);

    const handleImageClick = (photo) => {
        const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
        setSelectedPhoto({ ...photo, imgUrl });
      };
    
      const handleCloseModal = () => {
        setSelectedPhoto(null);
      };

      const handleDeleteFavorite = (photo) => {
        const token = localStorage.getItem("token");
        if (!token) {
         // console.log("No token found, please login first.");
         // return;
        }
        const imageUrl = photo.url || `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
    
        fetch(`http://localhost:3001/api/favorites/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageUrl: imageUrl, username: 'mariarodri', title: photo.title }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Image removed from favorites:", data);
            setFavorites(favorites.filter(fav => fav.id !== photo.id));
          })
          .catch((error) => console.error("Error:", error));
      };
  
    return (
        <div className="favorites">
        <h1>Favorites</h1>
        {error && <div className="error" key={error}>{error}</div>}
        <div className="image-list">
          {favorites.length > 0 ? (
            favorites.map((photo, index) => {
              return (
                <div key={index} className="image-item-wrapper">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="image-item"
                    onClick={() => handleImageClick(photo)}
                  />
                  <div>{photo.title}</div>
                  <button onClick={() => handleDeleteFavorite(photo)}>
                    Delete from Favorites
                  </button>
                </div>
              );
            })
          ) : (
            <p>No favorite images yet.</p>
          )}
        </div>
        {selectedPhoto && (
        <div className="modal" style={{ display: "block" }} onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseModal}>
              &times;
            </span>
            <img src={selectedPhoto.url} alt={selectedPhoto.title} />
          </div>
        </div>
      )}
      </div>
    );
  };
  
  export default Favorites;