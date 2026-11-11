import "./globals.css";
import Link from 'next/link';
import Header from './Header';
import { CartProvider } from './CartContext';
import { SITE, abs, shareImages, toJsonLd } from '../data/site';
import { locations } from '../data/locations';

const FOOTER_AREAS = ['cyber-city', 'cyber-hub', 'golf-course-road', 'sohna-road', 'mg-road', 'dlf-phase-3', 'udyog-vihar', 'sector-29'];

const KEYWORDS = [
  "vape shop gurugram",
  "vape shop gurgaon",
  "vape store gurugram",
  "vape shop near me gurugram",
  "buy vapes online gurugram",
  "disposable vapes gurugram",
  "elf bar gurugram",
  "elf bar gurgaon",
  "iget vape gurugram",
  "aaok vape gurugram",
  "voopoo gurugram",
  "vape delivery gurugram",
  "same day vape delivery gurugram",
  "30 minute vape delivery gurugram",
  "express vape delivery gurugram",
  "original vape gurugram",
  "vape shop haryana",
  "vape store cyber city",
  "vape shop cyber hub",
  "vape shop cyber city gurugram",
  ...locations.map((l) => `vape shop ${l.name.toLowerCase()}`),
];

export const metadata = {
  ...(SITE.url ? { metadataBase: new URL(SITE.url) } : {}),
  title: {
    default: "Vape Shop Gurugram - 30-40 Min Express Vape Delivery Original Gurugram",
    template: "%s | Vape Shop Gurugram"
  },
  description: "Buy 100% authentic disposable vapes, Elf Bar, AAOK, IGET, VOOPOO vape kits & more in Gurugram (Gurgaon). 30-40 min express delivery to Cyber City, Cyber Hub, Golf Course Road, Sohna Road & all sectors. Cash on delivery & 24/7 WhatsApp support.",
  keywords: [...new Set(KEYWORDS)],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    title: "Vape Shop Gurugram - 30-40 Min Express Vape Delivery Original Gurugram",
    description: "Buy 100% authentic disposable vapes, Elf Bar, AAOK, IGET & VOOPOO vape kits in Gurugram. 30-40 min express delivery across Cyber City, Golf Course Road, Sohna Road & all sectors. Cash on delivery available.",
    images: shareImages([
      {
        url: "/assets/og-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Vape Shop Gurugram Logo",
      },
    ]),
  },
  twitter: {
    card: "summary_large_image",
    title: "Vape Shop Gurugram - 30-40 Min Express Vape Delivery Original Gurugram",
    description: "Buy 100% authentic disposable vapes, Elf Bar, AAOK, IGET & VOOPOO vape kits in Gurugram. Express delivery across all sectors.",
    images: shareImages(["/assets/og-logo.jpg"]),
  },
  other: {
    "geo.region": SITE.stateCode,
    "geo.placename": "Gurugram, Haryana, India",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    "ICBM": `${SITE.geo.lat}, ${SITE.geo.lng}`
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": abs("/#store"),
    "name": SITE.name,
    "alternateName": "Vape Shop Gurgaon",
    "image": abs("/assets/logo.png"),
    "url": SITE.url || undefined,
    "telephone": SITE.phoneE164,
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE.address.street,
      "addressLocality": SITE.address.locality,
      "addressRegion": SITE.address.region,
      "postalCode": SITE.address.postalCode,
      "addressCountry": SITE.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE.geo.lat,
      "longitude": SITE.geo.lng
    },
    "areaServed": [
      { "@type": "City", "name": "Gurugram", "alternateName": "Gurgaon" },
      ...locations.map((l) => ({ "@type": "Place", "name": `${l.name}, Gurugram, Haryana` }))
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      `https://wa.me/${SITE.whatsapp}`
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          <div className="top-bar">
            <a href="https://wa.me/919203902308" target="_blank" rel="noreferrer" className="top-bar-link">
              <span className="pulse-dot"></span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '6px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>Order Only on WhatsApp - <strong>+91 92039 02308</strong></span>
            </a>
          </div>

          <Header />

          {children}

          <footer className="footer">
            <div className="container footer-grid">
              <div className="footer-col brand-col">
                <div className="footer-brand-title">
                  <img src="/assets/logo.png" alt="Vape Shop Gurugram Logo" className="footer-brand-logo" />
                </div>
                <p className="footer-brand-desc">
                  #1 trusted vape store in Gurugram (Gurgaon). Premium disposable vapes, vape kits & pods with fast express delivery to Cyber City, Cyber Hub, Golf Course Road, Sohna Road and every sector.
                </p>
                <div className="footer-contact-info">
                  <p className="footer-info-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Gurugram (Gurgaon), Haryana, India</span>
                  </p>
                  <a href="https://wa.me/919203902308" target="_blank" rel="noreferrer" className="footer-info-row footer-wa-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    <span>+91 92039 02308 (Order on WhatsApp)</span>
                  </a>
                </div>
              </div>

              <div className="footer-col">
                <h4>Quick Links</h4>
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/shop">Shop All Vapes</Link>
                <Link href="/shop?category=ELF+BAR+VAPE">Elf Bar Vapes</Link>
                <Link href="/shop?category=IGET+VAPE">IGET Vapes</Link>
                <Link href="/shop?category=AAOK+VAPE">AAOK Vapes</Link>
                <Link href="/shop?category=VAPE+KITS">Vape Kits</Link>
                <Link href="/shop?category=TEREA">Terea</Link>
              </div>

              <div className="footer-col">
                <h4>Customer Support</h4>
                <a href="https://wa.me/919203902308" target="_blank" rel="noreferrer">WhatsApp 24/7 Support</a>
                <Link href="#">Shipping & Delivery Policy</Link>
                <Link href="#">Refund & Return Policy</Link>
                <Link href="#">Terms & Conditions</Link>
                <Link href="#">Privacy Policy</Link>
              </div>

              <div className="footer-col">
                <h4>Delivery Areas</h4>
                {FOOTER_AREAS.map((slug) => {
                  const area = locations.find((l) => l.slug === slug);
                  return area ? (
                    <Link key={slug} href={`/vape-shop/${slug}`}>Vape Shop {area.name}</Link>
                  ) : null;
                })}
                <Link href="/vape-shop">All Gurugram Areas →</Link>
              </div>
            </div>

            <div className="footer-bottom container">
              <p>&copy; {new Date().getFullYear()} Vape Shop Gurugram. All rights reserved.</p>
              <div className="footer-badges">
                <span className="badge-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  Express Delivery
                </span>
                <span className="badge-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <circle cx="12" cy="12" r="2"></circle>
                  </svg>
                  COD &amp; UPI Payment
                </span>
                <span className="badge-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  100% Authentic
                </span>
              </div>
            </div>
          </footer>

        <a href="https://wa.me/919203902308" className="whatsapp-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
        </CartProvider>
      </body>
    </html>
  );
}
