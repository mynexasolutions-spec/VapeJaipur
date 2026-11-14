import Link from 'next/link';
import { canonical } from '../../data/site';

export const metadata = {
  title: { absolute: "About Us | Vape Shop Gurugram – Premium Vapes & Express Delivery in Gurgaon" },
  description: "Discover Vape Shop Gurugram – #1 vape store for 100% authentic disposable vapes, Elf Bar, AAOK, IGET and VOOPOO vape kits in Gurugram (Gurgaon), Haryana. 24/7 WhatsApp ordering with express delivery to Cyber City, Cyber Hub and every sector.",
  keywords: "vape shop gurugram, vape shop gurgaon, buy vapes online gurugram, elf bar gurugram, aaok vape gurugram, iget vape gurugram, voopoo gurugram, disposable vape delivery gurugram, vape store gurugram, vape store cyber city, vape shop cyber hub",
  alternates: canonical('/about'),
};

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

const stats = [
  { value: '100%', label: 'Authentic Guarantee', sub: 'Original QR Code Verified' },
  { value: '24/7', label: 'WhatsApp Support', sub: 'Instant Local Ordering' },
  { value: 'Express', label: 'Local Delivery', sub: 'Across All Gurugram' },
  { value: '90,000', label: 'Max Puff Capacity', sub: 'AAOK Ultra High-Puff Disposables' },
];

const features = [
  {
    title: 'Rapid Local Delivery',
    text: 'Enjoy express local delivery straight to your doorstep across Gurugram. Fast, reliable, and packaged with ultimate privacy.',
    icon: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: '100% Genuine & Verified',
    text: 'Zero counterfeits guaranteed. Every product comes directly from verified manufacturers with original QR authenticity checks.',
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
  },
  {
    title: '1-Click WhatsApp Order',
    text: "No tedious signups or checkout forms. Pick your flavour, tap 'Buy on WhatsApp', and chat directly with our team for instant confirmation.",
    icon: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" />,
  },
];

const steps = [
  { n: '01', title: 'Pick Your Product', text: 'Browse Elf Bar, AAOK, IGET disposables and VOOPOO & Uwell kits.' },
  { n: '02', title: 'Tap Buy on WhatsApp', text: 'Your order message with the product details is ready in one tap.' },
  { n: '03', title: 'Confirm & Receive', text: 'Our team confirms availability and delivers to your door in Gurugram.' },
];

const brands = [
  { title: 'Elf Bar Disposables', desc: 'Raya D3, Raya D3 Pro 30K, Ice King Pro 40K, FS18000, EP8000 & TE6000', img: 'elf-bar-ice-king-pro-grape-ice', href: '/shop?category=ELF+BAR+VAPE' },
  { title: 'AAOK Vapes', desc: 'Ultra high-puff disposables from 15,000 up to 90,000 puffs', img: 'aaok-90000-blue-razz-ice', href: '/shop?category=AAOK+VAPE' },
  { title: 'IGET Vapes', desc: 'IGET MOVE B50000 dual-flavour rechargeable disposable', img: 'iget-move-b50000-grape-ice-and-blackcurrant', href: '/shop?category=IGET+VAPE' },
  { title: 'Vape Kits & Pods', desc: 'VOOPOO Drag & Argus kits, Uwell Caliburn, coils and pods', img: 'voopoo-drag-5-premium-vape-kit', href: '/shop?category=VAPE+KITS' },
  { title: 'TEREA', desc: 'Heated tobacco sticks for IQOS ILUMA devices', img: 'terea-heated-tobacco-sticks', href: '/shop?category=TEREA' },
];

export default function AboutPage() {
  return (
    <main className="ab-page">
      {/* Hero */}
      <section className="ab-hero">
        <div className="ab-hero-glow" aria-hidden="true"></div>
        <div className="ab-container ab-hero-grid">
          <div className="ab-hero-text">
            <span className="ab-pill">Gurugram&apos;s #1 Premium Vape Hub</span>
            <h1 className="ab-title">
              Redefining the Vaping Experience <span>in Gurugram</span>
            </h1>
            <p className="ab-lead">
              Your trusted local destination for 100% authentic disposable vapes, vape kits and pods&mdash;delivered to your doorstep with express speed.
            </p>
            <div className="ab-btn-row">
              <Link href="/shop" className="ab-btn ab-btn-primary">Explore All Vapes</Link>
              <a href="https://wa.me/919828275698" target="_blank" rel="noreferrer" className="ab-btn ab-btn-wa">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d={WA_PATH} /></svg>
                Order on WhatsApp
              </a>
            </div>
          </div>
          <div className="ab-hero-visual">
            <img src="/assets/hero-products.webp" alt="Elf Bar, VOOPOO Drag and Argus vapes available at Vape Shop Gurugram" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="ab-container ab-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="ab-stat">
            <div className="ab-stat-value">{stat.value}</div>
            <div className="ab-stat-label">{stat.label}</div>
            <div className="ab-stat-sub">{stat.sub}</div>
          </div>
        ))}
      </section>

      {/* Story */}
      <section className="ab-container ab-story">
        <div className="ab-story-media" aria-hidden="true">
          <img src="/assets/products/aaok-90000-cheese-cake.jpeg" alt="" className="ab-story-img ab-story-img-1" />
          <img src="/assets/products/elf-bar-ice-king-pro-watermelon-ice.jpeg" alt="" className="ab-story-img ab-story-img-2" />
        </div>
        <div className="ab-story-text">
          <span className="ab-kicker">Our Story</span>
          <h2 className="ab-h2">Welcome to Vape Shop Gurugram</h2>
          <p>
            At <strong>Vape Shop Gurugram</strong>, we are committed to revolutionizing how Gurugram vapes. From the office towers of Cyber City and the buzz of Cyber Hub to the societies on Golf Course Road and Sohna Road, we bring you the world&rsquo;s most acclaimed disposable vape devices, vape kits and pods without the hassle of long waits or doubtful quality.
          </p>
          <p>
            We handpick every product in our lineup&mdash;from high-puff <strong>Elf Bar</strong> models and ultra high-puff <strong>AAOK</strong> disposables to <strong>VOOPOO</strong> and <strong>Uwell</strong> vape kits&mdash;ensuring maximum flavour, genuine quality, and complete vaping satisfaction.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">Why Choose Us</span>
          <h2 className="ab-h2">Built for Gurugram Vapers</h2>
        </div>
        <div className="ab-features">
          {features.map((f, i) => (
            <div key={f.title} className="ab-feature">
              <span className="ab-feature-num">0{i + 1}</span>
              <div className="ab-feature-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to order */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">How It Works</span>
          <h2 className="ab-h2">Order in 3 Simple Steps</h2>
        </div>
        <div className="ab-steps">
          {steps.map((s) => (
            <div key={s.n} className="ab-step">
              <div className="ab-step-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="ab-container ab-section">
        <div className="ab-section-head">
          <span className="ab-kicker">Curated Inventory</span>
          <h2 className="ab-h2">Top Vaping Brands in Stock</h2>
        </div>
        <div className="ab-brands">
          {brands.map((b) => (
            <Link key={b.title} href={b.href} className="ab-brand">
              <div className="ab-brand-img">
                <img src={`/assets/products/${b.img}.jpeg`} alt={b.title} loading="lazy" />
              </div>
              <div className="ab-brand-body">
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <span className="ab-brand-tag">Available Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ab-container ab-cta-wrap">
        <div className="ab-cta">
          <h2>Ready to Elevate Your Vaping?</h2>
          <p>
            Browse our full catalog of Elf Bar, AAOK and IGET disposables, VOOPOO and Uwell vape kits, pods and coils with instant WhatsApp ordering and express delivery across Gurugram.
          </p>
          <div className="ab-btn-row ab-btn-row-center">
            <Link href="/shop" className="ab-btn ab-btn-primary">Explore All Vapes in Gurugram</Link>
            <a href="https://wa.me/919828275698" target="_blank" rel="noreferrer" className="ab-btn ab-btn-wa">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d={WA_PATH} /></svg>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
