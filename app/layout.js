import './globals.css'

export const metadata = {
  title: 'FlickrFavorites',
  description: 'A modern photo gallery app using Flickr API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
      </body>
    </html>
  )
}
