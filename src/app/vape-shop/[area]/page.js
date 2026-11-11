import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '../../ProductCard';
import { products } from '../../../data/products';
import { locations, getLocation, locationKeywords } from '../../../data/locations';
import { SITE, OG_IMAGE, abs, canonical, shareImages, waLink, toJsonLd } from '../../../data/site';

// Only the areas listed in locations.js exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ area: l.slug }));
}

function pageTitle(loc) {
  return loc.name.length > 16
    ? `Vape Shop ${loc.name}, Gurugram | Vape Delivery`
    : `Vape Shop ${loc.name}, Gurugram | Vape Store ${loc.name}`;
}

function nearbyOf(loc) {
  return loc.nearby.map(getLocation).filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { area } = await params;
  const loc = getLocation(area);
  if (!loc) return {};

  const nearbyNames = nearbyOf(loc).slice(0, 3).map((n) => n.name).join(', ');
  const description = `Looking for a vape shop in ${loc.name}, Gurugram? Order Elf Bar, AAOK, IGET disposables & VOOPOO kits on WhatsApp with fast delivery to ${loc.name}, ${nearbyNames}. 100% authentic, COD.`;
  const url = `/vape-shop/${loc.slug}`;

  return {
    title: { absolute: pageTitle(loc) },
    description,
    keywords: locationKeywords(loc),
    alternates: canonical(url),
    // openGraph/twitter replace the layout's values, so repeat the shared fields here.
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      siteName: SITE.name,
      title: `Vape Shop in ${loc.name}, Gurugram | ${SITE.name}`,
      description,
      url: abs(url),
      images: shareImages([OG_IMAGE]),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Vape Shop in ${loc.name}, Gurugram | ${SITE.name}`,
      description,
      images: shareImages([OG_IMAGE.url]),
    },
  };
}

export default async function AreaPage({ params }) {
  const { area } = await params;
  const loc = getLocation(area);
  if (!loc) notFound();

  const index = locations.indexOf(loc);
  const nearby = nearbyOf(loc);

  // Rotate the product list per area so each page shows a different set.
  const offset = (index * 3) % products.length;
  const featured = [...products.slice(offset), ...products.slice(0, offset)].slice(0, 8);

  const orderText = `Hi, I want to order a vape. Delivery location: ${loc.name}, Gurugram.`;
  const searches = locationKeywords(loc).slice(0, 8);

  const faqs = [
    {
      q: `Do you deliver vapes in ${loc.name}, Gurugram?`,
      a: `Yes. We deliver across ${loc.name} (${loc.pincode}) and nearby areas like ${nearby.slice(0, 3).map((n) => n.name).join(', ')}. Send us your location on WhatsApp and we will confirm the delivery time.`,
    },
    {
      q: `How do I order from the vape store in ${loc.name}?`,
      a: `Pick a product on our website and tap "Buy on WhatsApp", or message us directly at ${SITE.phoneDisplay}. Our team confirms stock, price and delivery to your address in ${loc.name}.`,
    },
    {
      q: 'Is cash on delivery or UPI payment available?',
      a: `Yes, you can pay by cash on delivery or UPI for orders in ${loc.name} and the rest of Gurugram.`,
    },
    {
      q: 'Are your vapes original?',
      a: 'We only sell 100% authentic products from brands like Elf Bar, AAOK, IGET, VOOPOO and Uwell. Most devices carry an original QR code you can verify.',
    },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: abs('/') },
      { '@type': 'ListItem', position: 2, name: 'Delivery Areas', item: abs('/vape-shop') },
      { '@type': 'ListItem', position: 3, name: `Vape Shop ${loc.name}`, item: abs(`/vape-shop/${loc.slug}`) },
    ],
  };

  const storeLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': abs('/#store'),
    name: SITE.name,
    url: abs(`/vape-shop/${loc.slug}`),
    telephone: SITE.phoneE164,
    image: abs('/assets/logo.png'),
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { '@type': 'Place', name: `${loc.name}, Gurugram, Haryana ${loc.pincode}` },
      ...nearby.map((n) => ({ '@type': 'Place', name: `${n.name}, Gurugram, Haryana` })),
    ],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <main className="ab-page loc-page">
      {SITE.url && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(storeLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqLd) }} />

      {/* Hero */}
      <section className="ab-hero loc-hero">
        <div className="ab-hero-glow" aria-hidden="true"></div>
        <div className="ab-container">
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/vape-shop">Delivery Areas</Link>
            <span>/</span>
            <span className="current">{loc.name}</span>
          </nav>
          <span className="ab-pill">📍 {loc.name}, Gurugram &bull; {loc.pincode}</span>
          <h1 className="ab-title">
            Vape Shop in <span>{loc.name}</span>
          </h1>
          <p className="ab-lead">{loc.intro}</p>
          <div className="ab-btn-row">
            <a href={waLink(orderText)} target="_blank" rel="noreferrer" className="ab-btn ab-btn-wa">
              Order on WhatsApp
            </a>
            <Link href="/shop" className="ab-btn ab-btn-primary">Shop All Vapes</Link>
          </div>
          <ul className="loc-chips" aria-label={`Places we deliver near ${loc.name}`}>
            {loc.landmarks.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">Delivered in {loc.name}</span>
          <h2 className="ab-h2">Popular Vapes in {loc.name}</h2>
        </div>
        <div className="shop-product-grid loc-grid">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="ab-btn-row ab-btn-row-center loc-more">
          <Link href="/shop" className="ab-btn ab-btn-primary">View All Products</Link>
        </div>
      </section>

      {/* About this area */}
      <section className="ab-container ab-section">
        <div className="pd-panel loc-panel">
          <h2>Vape Store {loc.name} – Disposable Vapes, Pods &amp; Vape Kits</h2>
          <p>
            {SITE.name} delivers to {loc.name} and the rest of Gurugram. Whether you are at work near{' '}
            {loc.landmarks[0]} or at home close to {loc.landmarks[1]}, you can order Elf Bar disposables (TE6000,
            EP8000, FS18000, Raya D3 Pro, Ice King Pro), ultra high-puff AAOK devices up to 90,000 puffs, the IGET
            MOVE B50000, VOOPOO Drag and Argus kits, Uwell Caliburn pods, coils and TEREA sticks.
          </p>
          <p>
            There is no checkout form. Choose a product, tap &quot;Buy on WhatsApp&quot; and tell us your address in{' '}
            {loc.name}. We confirm availability and send your order with express delivery, and cash on delivery
            is available.
          </p>
          <p>
            Searching for a <strong>vape shop in {loc.name}</strong>, a <strong>vape store near {loc.landmarks[0]}</strong>{' '}
            or <strong>vape delivery in {loc.name} {loc.pincode}</strong>? Message us at{' '}
            <a href={waLink(orderText)} target="_blank" rel="noreferrer">{SITE.phoneDisplay}</a>.
          </p>
          <p className="loc-searches">
            <span>Popular searches:</span> {searches.join(' · ')}
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">Why Order From Us</span>
          <h2 className="ab-h2">Fast Vape Delivery in {loc.name}</h2>
        </div>
        <div className="ab-features">
          <div className="ab-feature">
            <span className="ab-feature-num">01</span>
            <h3>Express Local Delivery</h3>
            <p>Quick delivery to homes, offices and PGs in {loc.name}, packed discreetly.</p>
          </div>
          <div className="ab-feature">
            <span className="ab-feature-num">02</span>
            <h3>100% Authentic</h3>
            <p>Original Elf Bar, AAOK, IGET, VOOPOO and Uwell products only. No copies.</p>
          </div>
          <div className="ab-feature">
            <span className="ab-feature-num">03</span>
            <h3>WhatsApp, COD &amp; UPI</h3>
            <p>Order in one tap on WhatsApp and pay by cash on delivery or UPI in {loc.name}.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">FAQ</span>
          <h2 className="ab-h2">Vape Delivery in {loc.name}: Questions</h2>
        </div>
        <div className="pd-policies loc-faq">
          {faqs.map((f) => (
            <details key={f.q} className="pd-policy">
              <summary>{f.q} <span aria-hidden="true">+</span></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Nearby areas */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">Also Delivering To</span>
          <h2 className="ab-h2">Vape Shop Near {loc.name}</h2>
        </div>
        <ul className="loc-area-links">
          {nearby.map((n) => (
            <li key={n.slug}>
              <Link href={`/vape-shop/${n.slug}`}>Vape Shop {n.name}</Link>
            </li>
          ))}
          <li>
            <Link href="/vape-shop">All Gurugram Areas →</Link>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="ab-container ab-cta-wrap">
        <div className="ab-cta">
          <h2>Order Your Vape in {loc.name}</h2>
          <p>Message us on WhatsApp with your product and address in {loc.name}, Gurugram. We will confirm availability and delivery time.</p>
          <div className="ab-btn-row ab-btn-row-center">
            <a href={waLink(orderText)} target="_blank" rel="noreferrer" className="ab-btn ab-btn-wa">
              Order on WhatsApp
            </a>
            <Link href="/shop" className="ab-btn ab-btn-primary">Explore All Vapes</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
