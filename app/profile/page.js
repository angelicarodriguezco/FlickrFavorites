'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import UserProfile from '../components/UserProfile'

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Redirecting...</p>
      </div>
    )
  }

  return (
    <UserProfile 
      user={user} 
      onLogout={handleLogout}
    />
  )
}
