'use client'

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const Favorites = () => {
  const { user, isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [editingTitle, setEditingTitle] = useState(null)
  const [newTitle, setNewTitle] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setLoading(false)
      return
    }

    fetch(`/api/favorites?userId=${user._id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data)
        if (Array.isArray(data)) {
          setFavorites(data)
        } else {
          setError(data.error || "Failed to load favorites.")
        }
        setLoading(false)
      })
      .catch((err) => {
        setError("An error occurred: " + err.message)
        setLoading(false)
      })
  }, [isAuthenticated, user])

  const handleImageClick = (photo) => {
    setSelectedPhoto(photo)
  }

  const handleCloseModal = () => {
    setSelectedPhoto(null)
  }

  const handleDeleteFavorite = (photo) => {
    const imageUrl = photo.url

    fetch(`/api/favorites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: imageUrl, userId: user._id, title: photo.title }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Image removed from favorites:", data)
        setFavorites(favorites.filter((fav) => fav.url !== photo.url))
      })
      .catch((error) => console.error("Error:", error))
  }

  const handleEditTitle = (photo) => {
    setEditingTitle(photo.url)
    setNewTitle(photo.title)
  }

  const handleSaveTitle = (photo) => {
    fetch(`/api/favorites`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl: photo.url, newTitle, userId: user._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Title updated:", data)
        setFavorites(favorites.map((fav) => (fav.url === photo.url ? { ...fav, title: newTitle } : fav)))
        setEditingTitle(null)
      })
      .catch((error) => console.error("Error:", error))
  }

  if (!isAuthenticated) {
    return (
      <div className="favorites">
        <div className="page-header">
          <h1 className="page-title">My Favorites</h1>
          <p className="page-subtitle">Please log in to view your favorites</p>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🔒</div>
          <h3 className="empty-title">Authentication Required</h3>
          <p className="empty-description">You need to be logged in to view your favorites</p>
        </div>
      </div>
    )
  }

  return (
    <div className="favorites">
      <div className="page-header">
        <h1 className="page-title">My Favorites</h1>
        <p className="page-subtitle">Your curated collection of images</p>
      </div>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-text">Loading favorites...</p>
        </div>
      ) : (
        <div className={`image-list ${favorites.length === 0 ? 'empty' : ''}`}>
          {favorites.length > 0 ? (
            favorites.map((photo, index) => (
              <div key={index} className="image-card">
                <div className="image-wrapper" onClick={() => handleImageClick(photo)}>
                  <img src={photo.url || "/placeholder.svg"} alt={photo.title} className="image-item" />
                  <div className="image-overlay">
                    <p className="image-title">{photo.title || "Untitled"}</p>
                  </div>
                </div>
                <div className="image-actions" style={{ flexDirection: "column", gap: "0.5rem" }}>
                  {editingTitle === photo.url ? (
                    <>
                      <input
                        type="text"
                        className="edit-input"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Enter new title"
                      />
                      <button className="action-btn save" onClick={() => handleSaveTitle(photo)}>
                        <span className="save-icon">✓</span> Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="action-btn edit" onClick={() => handleEditTitle(photo)}>
                        <span className="edit-icon">✎</span> Edit Title
                      </button>
                      <button className="action-btn delete" onClick={() => handleDeleteFavorite(photo)}>
                        <span className="delete-icon">×</span> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">💔</div>
              <h3 className="empty-title">No favorites yet</h3>
              <p className="empty-description">Start adding images from the gallery</p>
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
            <img src={selectedPhoto.url || "/placeholder.svg"} alt={selectedPhoto.title} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Favorites
