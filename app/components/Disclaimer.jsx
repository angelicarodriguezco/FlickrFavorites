import Link from 'next/link'

const Disclaimer = () => {
  return (
    <div className="gallery">
      <div className="page-header">
        <h1 className="page-title">Welcome to FlickrFavorites</h1>
        <p className="page-subtitle">Browse and save your favorite Flickr images</p>
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
          background: "var(--bg-card)",
          borderRadius: "16px",
          border: "1px solid var(--border-color)",
          lineHeight: "1.8",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Disclaimer</h2>
        <p style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>
          This application is built as part of a coding challenge and uses the Flickr API to fetch and display images.
          Please be aware that the content retrieved from Flickr is not curated or controlled by this application.
        </p>

        <p style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>
          Flickr is a public image-sharing platform where users upload their own content, which may include
          inappropriate or explicit material. This application has enabled Flickr's{" "}
          <strong>SafeSearch filtering</strong> to minimize the risk of displaying such content. However, no filtering
          system is completely foolproof.
        </p>

        <p style={{ marginBottom: "1rem", color: "var(--text-secondary)" }}>
          I do not have control over the images provided by Flickr, nor do I assume responsibility for any
          inappropriate, explicit, or offensive content that may appear. If additional filtering or moderation is
          required, it should be handled at the Flickr API level or within Flickr account settings.
        </p>

        <p style={{ color: "var(--text-secondary)" }}>
          By using this application, you acknowledge that image content is sourced externally and that any concerns
          regarding inappropriate material should be directed to Flickr's reporting mechanisms.
        </p>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Link
            href="/gallery"
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              background: "var(--accent-primary)",
              color: "white",
              textDecoration: "none",
              borderRadius: "10px",
              fontWeight: "500",
              transition: "all 0.3s ease",
            }}
          >
            Continue to Gallery →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
