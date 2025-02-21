import React, { useState, useEffect } from "react";
import "../styles/list-style.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        console.log('Fetching favorites')
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
  
    return (
      <div className="favorites">
        <h1>Favorites</h1>
        {error && <div className="error" key={error}>{error}</div>}
        <div className="image-list">
          {favorites.length > 0 ? (
            favorites.map((photo, index) => {
              
              return (
                <>
                <img
                  key={index}
                  src={photo.url}
                  alt={photo.title}
                  className="image-item"
                />
                <div>{photo.title}</div>
                </>
              );
            })
          ) : (
            <p>No favorite images yet.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Favorites;