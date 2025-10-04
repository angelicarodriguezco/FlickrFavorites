'use client'

import { useState, useEffect } from 'react'

const UserProfile = ({ user, onLogout }) => {
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: profileData.username,
          email: profileData.email
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Profile updated successfully!')
        setIsEditing(false)
        const updatedUser = { ...user, ...data.user }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        setTimeout(() => setSuccess(''), 3000)
      } else {
        setError(data.error || 'Update failed')
      }
    } catch (error) {
      console.error('Profile update error:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setProfileData({
      username: user?.username || '',
      email: user?.email || ''
    })
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    onLogout()
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">User Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Username:</span>
              <span className="info-value">{user?.username || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email || 'N/A'}</span>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profileData.username}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="form-actions">
                <button 
                  type="button" 
                  onClick={handleCancel}
                  className="auth-button secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="auth-button primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner small"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-actions">
              <button 
                onClick={() => setIsEditing(true)}
                className="auth-button primary"
              >
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="auth-button danger"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
