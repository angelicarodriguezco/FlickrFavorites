'use client'

import Link from 'next/link'

function AuthHeader() {
  return (
    <header className="auth-header-simple">
      <Link href="/" className="header-logo">
        FlickrFavorites
      </Link>
    </header>
  )
}

export default AuthHeader
