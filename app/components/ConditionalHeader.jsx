'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'
import Header from './Header'
import AuthHeader from './AuthHeader'

function ConditionalHeader() {
  const pathname = usePathname()
  const { isAuthenticated, loading } = useAuth()

  if (pathname === '/auth') {
    return <AuthHeader />
  }

  if (loading) {
    return <AuthHeader />
  }

  if (isAuthenticated) {
    return <Header />
  }

  return <AuthHeader />
}

export default ConditionalHeader
