'use client'

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { getPhotos } from "../services/flickrService"

const Gallery = () => {
  const { user, isAuthenticated } = useAuth()
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [successMessages, setSuccessMessages] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("mountains")
  const [activeFilter, setActiveFilter] = useState("mountains")

  const filters = ["mountains", "ocean", "city", "nature", "architecture", "sunset"]

  useEffect(() => {
    loadPhotos(searchQuery)
  }, [])

  const loadPhotos = (query) => {
    setLoading(true)
    getPhotos(query)
      .then((photos) => {
        setPhotos(photos)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading photos:", error)
        setLoading(false)
      })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    loadPhotos(searchQuery)
    setActiveFilter("")
  }

  const handleFilterClick = (filter) => {
    setSearchQuery(filter)
    setActiveFilter(filter)
    loadPhotos(filter)
  }

  const handleImageClick = (photo) => {
    const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`
    setSelectedPhoto({ ...photo, imgUrl })
  }

  const handleCloseModal = () => {
    setSelectedPhoto(null)
  }

  const handleFavorite = (photo) => {
    if (!isAuthenticated) {
      alert('Please log in to add favorites')
      return
    }

    const imageUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`

    fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        imageUrl: imageUrl, 
        userId: user._id, 
        title: photo.title 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image added to favorites:", data)
        setFavorites((prevFavorites) => [...prevFavorites, photo])
        setSuccessMessages((prevMessages) => ({
          ...prevMessages,
          [photo.id]: true,
        }))

        setTimeout(() => {
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            [photo.id]: false,
          }))
        }, 3000)
      })
      .catch((error) => console.error("Error:", error))
  }

  return (
    <div className="gallery">
      <div className="page-header">
        <h1 className="page-title">Discover Images</h1>
        <p className="page-subtitle">Explore beautiful photos from Flickr</p>
      </div>

      <div className="controls-section">
        <form onSubmit={handleSearch} className="search-container">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search for images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading images...</p>
        </div>
      ) : (
        <div className="image-list">
          {photos.length > 0 ? (
            photos.map((photo) => {
              const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`
              return (
                <div key={photo.id} className="image-card">
                  <div className="image-wrapper" onClick={() => handleImageClick(photo)}>
                    <img src={imgUrl || "/placeholder.svg"} alt={photo.title} className="image-item" />
                    <div className="image-overlay">
                      <p className="image-title">{photo.title || "Untitled"}</p>
                    </div>
                  </div>
                  <div className="image-actions">
                    <button onClick={() => handleFavorite(photo)} className="action-btn favorite">
                      <span className="favorite-icon">♥</span> Mark Favorite
                    </button>
                  </div>
                  {successMessages[photo.id] && <div className="success-message">Added to favorites!</div>}
                </div>
              )
            })
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📷</div>
              <h3 className="empty-title">No images found</h3>
              <p className="empty-description">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {selectedPhoto && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
              ×
            </button>
            <img src={selectedPhoto.imgUrl || "/placeholder.svg"} alt={selectedPhoto.title} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
