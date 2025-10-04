'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

function Header() {
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <Link href="/" className="header-logo">
        FlickrFavorites
      </Link>
      <nav className="nav-links">
        <Link href="/gallery" className={pathname === "/gallery" ? "active" : ""}>
          Gallery
        </Link>
        <Link href="/favorites" className={pathname === "/favorites" ? "active" : ""}>
          Favorites
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/profile" className={pathname === "/profile" ? "active" : ""}>
              Profile
            </Link>
            <div className="user-menu">
              <span className="user-greeting">Hello, {user?.username}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link href="/auth" className={pathname === "/auth" ? "active" : ""}>
            Login
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
