'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import Login from '../components/Login'
import Register from '../components/Register'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const { login } = useAuth()
  const router = useRouter()

  const handleLoginSuccess = (userData) => {
    login(userData)
    router.push('/')
  }

  const handleRegisterSuccess = (userData) => {
    if (userData) {
      login(userData)
      router.push('/')
    } else {
      setIsLogin(true)
    }
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  const switchToRegister = () => {
    setIsLogin(false)
  }

  return (
    <div className="auth-page">
      {isLogin ? (
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={switchToRegister}
        />
      ) : (
        <Register 
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  )
}
