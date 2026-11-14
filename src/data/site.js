// Single place for business details used across the site (SEO tags, schema, footer, WhatsApp links).
// Change values here instead of editing every page.

export const SITE = {
  name: 'Vape Shop Gurugram',
  // Live domain (no trailing slash). Can be overridden with NEXT_PUBLIC_SITE_URL in the host's env settings.
  // Used for canonical URLs, sitemap, robots.txt, share images and schema.
  // If empty, those absolute-URL features are skipped.
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vapestoregurugram.in').replace(/\/+$/, ''),
  city: 'Gurugram',
  cityAlt: 'Gurgaon',
  state: 'Haryana',
  stateCode: 'IN-HR',
  phoneDisplay: '+91 98282 75698',
  phoneE164: '+919828275698',
  whatsapp: '919828275698',
  address: {
    // TODO: replace with the exact shop address (must match the Google Business Profile).
    street: 'DLF Cyber City, DLF Phase 2',
    locality: 'Gurugram',
    region: 'Haryana',
    postalCode: '122002',
    country: 'IN',
  },
  geo: { lat: 28.4950, lng: 77.0895 },
};

// Absolute URL for a path, or undefined while no domain is set (JSON.stringify drops undefined).
export const abs = (path) => (SITE.url ? `${SITE.url}${path}` : undefined);

// Canonical link tag, only when a domain is set.
export const canonical = (path) => (SITE.url ? { canonical: path } : undefined);

// Social-share images need an absolute URL, so skip them until a domain is set.
export const shareImages = (list) => (SITE.url ? list : undefined);

export const OG_IMAGE = { url: '/assets/og-logo.jpg', width: 1200, height: 630, alt: 'Vape Shop Gurugram Logo' };

// Serialise JSON-LD safely for a <script> tag (escapes "<" so content can't close the tag).
export const toJsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

export const waLink = (text) =>
  text ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : `https://wa.me/${SITE.whatsapp}`;
