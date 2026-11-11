import Link from 'next/link';
import { locations, LOCATION_GROUPS } from '../../data/locations';
import { SITE, OG_IMAGE, abs, canonical, shareImages, waLink, toJsonLd } from '../../data/site';

export const metadata = {
  title: { absolute: 'Vape Shop Near Me in Gurugram | All Vape Delivery Areas' },
  description:
    'Vape delivery across Gurugram (Gurgaon): Cyber City, Cyber Hub, Golf Course Road, Sohna Road, MG Road, DLF Phase 1-5, Udyog Vihar, Sector 29, South City, New Gurugram, Dwarka Expressway and more.',
  keywords: [
    'vape shop near me gurugram',
    'vape shop gurugram',
    'vape shop gurgaon',
    'vape delivery gurugram',
    ...locations.map((l) => `vape shop ${l.name.toLowerCase()}`),
  ],
  alternates: canonical('/vape-shop'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE.name,
    title: 'Vape Shop Near Me in Gurugram | All Vape Delivery Areas',
    description: 'Vape delivery across Gurugram (Gurgaon): Cyber City, Cyber Hub, Golf Course Road, Sohna Road, MG Road, DLF Phase 1-5 and every sector.',
    url: abs('/vape-shop'),
    images: shareImages([OG_IMAGE]),
  },
};

export default function AreasPage() {
  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE.name} delivery areas`,
    itemListElement: locations.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Vape Shop ${l.name}, Gurugram`,
      url: abs(`/vape-shop/${l.slug}`),
    })),
  };

  return (
    <main className="ab-page loc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(itemListLd) }} />

      <section className="ab-hero loc-hero">
        <div className="ab-hero-glow" aria-hidden="true"></div>
        <div className="ab-container">
          <nav className="pd-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span className="current">Delivery Areas</span>
          </nav>
          <span className="ab-pill">📍 Gurugram, Haryana</span>
          <h1 className="ab-title">
            Vape Delivery Across <span>Gurugram</span>
          </h1>
          <p className="ab-lead">
            From Cyber City and Cyber Hub to Golf Course Road, Sohna Road and New Gurugram, we deliver 100% authentic
            disposable vapes, pods and vape kits to every corner of Gurugram (Gurgaon). Pick your area below.
          </p>
          <div className="ab-btn-row">
            <a href={waLink('Hi, I want to order a vape in Gurugram.')} target="_blank" rel="noreferrer" className="ab-btn ab-btn-wa">
              Order on WhatsApp
            </a>
            <Link href="/shop" className="ab-btn ab-btn-primary">Shop All Vapes</Link>
          </div>
        </div>
      </section>

      {LOCATION_GROUPS.map((group) => (
        <section key={group} className="ab-container ab-section loc-group">
          <div className="ab-section-head">
            <span className="ab-kicker">Gurugram</span>
            <h2 className="ab-h2">{group}</h2>
          </div>
          <ul className="loc-area-cards">
            {locations
              .filter((l) => l.group === group)
              .map((l) => (
                <li key={l.slug}>
                  <Link href={`/vape-shop/${l.slug}`}>
                    <strong>Vape Shop {l.name}</strong>
                    <span>{l.landmarks.slice(0, 3).join(' · ')}</span>
                    <em>{l.pincode}</em>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section className="ab-container ab-cta-wrap">
        <div className="ab-cta">
          <h2>Don&apos;t See Your Area?</h2>
          <p>We deliver across Gurugram. Send your location on WhatsApp and we will confirm delivery.</p>
          <div className="ab-btn-row ab-btn-row-center">
            <a href={waLink('Hi, do you deliver to my area in Gurugram?')} target="_blank" rel="noreferrer" className="ab-btn ab-btn-wa">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
