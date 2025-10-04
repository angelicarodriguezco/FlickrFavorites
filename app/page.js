'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './contexts/AuthContext'
import Disclaimer from './components/Disclaimer'

export default function Home() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to FlickrFavorites</h1>
        <p className="welcome-subtitle">Discover and save your favorite images from Flickr</p>
      </div>
      <Disclaimer />
    </div>
  )
}
