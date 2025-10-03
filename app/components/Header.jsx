'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {
  const pathname = usePathname()

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
        <Link href="/login" className={pathname === "/login" ? "active" : ""}>
          Login
        </Link>
      </nav>
    </header>
  )
}

export default Header
