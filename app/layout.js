import './globals.css'
import { AuthProvider } from './contexts/AuthContext'
import ConditionalHeader from './components/ConditionalHeader'

export const metadata = {
  title: 'FlickrFavorites',
  description: 'A modern photo gallery app using Flickr API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <ConditionalHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
