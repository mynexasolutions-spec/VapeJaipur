import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import HeroImageSlider from './HeroImageSlider';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { locations } from '../data/locations';
import { canonical } from '../data/site';

export const metadata = {
  title: "Vape Shop Gurugram - 30-40 Min Express Vape Delivery Original Gurugram",
  description: "Vape Shop Gurugram (Gurgaon) – original disposable vapes, vape kits and pods with 30-40 min express delivery to Cyber City, Cyber Hub, Golf Course Road, Sohna Road, MG Road and every sector. Elf Bar, AAOK, IGET, VOOPOO & Terea.",
  alternates: canonical('/'),
};

export default function Home() {
  // Hero images rotate automatically. A third image appears as soon as public/assets/hero-fruity.webp exists.
  const heroImages = [
    { src: '/assets/hero-products.webp', alt: 'Elf Bar Raya, VOOPOO Drag and VOOPOO Argus vape devices available in Gurugram' },
    { src: '/assets/hero-lineup.webp', alt: 'Elf Bar FS18000, AAOK ABAC 80000, TEREA sticks and VOOPOO Drag vape kit available in Gurugram' },
  ];
  if (fs.existsSync(path.join(process.cwd(), 'public', 'assets', 'hero-fruity.webp'))) {
    heroImages.push({ src: '/assets/hero-fruity.webp', alt: 'Elf Bar EP8000, Elf Bar FS18000 and VOOPOO Argus vapes available in Gurugram' });
  }

  const elfBarProducts = products.filter(p => p.category === 'ELF BAR VAPE');
  const aaokProducts = products.filter(p => p.category === 'AAOK VAPE');
  const igetProducts = products.filter(p => p.category === 'IGET VAPE');
  const kitProducts = products.filter(p => p.category === 'VAPE KITS');
  const tereaProducts = products.filter(p => p.category === 'TEREA');

  const renderGrid = (items) => (
    <div className="product-grid shop-product-grid">
      {items.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );

  return (
    <main>
      {/* Hero Section */}
      <section className="jp-hero">
        <div className="jp-hero-smoke" aria-hidden="true"></div>
        <div className="jp-hero-inner">
          <div className="jp-hero-text">
            <p className="jp-hero-kicker">Explore the Latest in</p>
            <h1 className="jp-hero-title">
              <span className="jp-hero-title-1">VAPING</span>
              <span className="jp-hero-title-2">ESSENTIALS</span>
            </h1>
            <div className="jp-hero-swoosh" aria-hidden="true"></div>
            <ul className="jp-hero-tags">
              <li>Premium Vapes</li>
              <li>Pods</li>
              <li>Vape Kits</li>
              <li>Accessories</li>
            </ul>
            <div className="jp-hero-cta">
              <Link href="/shop" className="jp-hero-btn">SHOP NOW</Link>
              <a href="https://wa.me/919203902308" target="_blank" rel="noreferrer" className="jp-hero-btn jp-hero-btn-ghost">ORDER ON WHATSAPP</a>
            </div>
          </div>
          <HeroImageSlider images={heroImages} />
        </div>
      </section>

      {/* Dual Angled Marquee Section */}
      <div className="dual-marquee-wrapper">
        <div className="marquee-bar marquee-black">
          <div className="marquee-content marquee-content-right">
            <span className="marquee-item">DISPOSABLE VAPES 🛒</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">VAPE KITS & PODS 💎</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">FAST SHIPPING 🚀</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">TRUSTED IN GURUGRAM 📍</span>
            <span className="marquee-item">◆</span>
            {/* Duplicates for infinite scroll */}
            <span className="marquee-item">DISPOSABLE VAPES 🛒</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">VAPE KITS & PODS 💎</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">FAST SHIPPING 🚀</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">TRUSTED IN GURUGRAM 📍</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">DISPOSABLE VAPES 🛒</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">VAPE KITS & PODS 💎</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">FAST SHIPPING 🚀</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">TRUSTED IN GURUGRAM 📍</span>
            <span className="marquee-item">◆</span>
          </div>
        </div>

        <div className="marquee-bar marquee-blue">
          <div className="marquee-content marquee-content-left">
            <span className="marquee-item">30-40 MIN DELIVERY ⚡</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">EXPRESS DELIVERY 🚚</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">CASH ON DELIVERY & UPI 💵</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">PREMIUM VAPES 💎</span>
            <span className="marquee-item">◆</span>
            {/* Duplicates for infinite scroll */}
            <span className="marquee-item">30-40 MIN DELIVERY ⚡</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">EXPRESS DELIVERY 🚚</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">CASH ON DELIVERY & UPI 💵</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">PREMIUM VAPES 💎</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">30-40 MIN DELIVERY ⚡</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">EXPRESS DELIVERY 🚚</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">CASH ON DELIVERY & UPI 💵</span>
            <span className="marquee-item">◆</span>
            <span className="marquee-item">PREMIUM VAPES 💎</span>
            <span className="marquee-item">◆</span>
          </div>
        </div>
      </div>

      {/* Product Category Section: ELF BAR */}
      <section className="category-section">
        <div className="container">
          <div className="section-header-wrap">
            <span className="section-badge-pill">PREMIUM DISPOSABLES</span>
            <h2 className="section-title">ELF BAR VAPE</h2>
          </div>
          {renderGrid(elfBarProducts)}
        </div>
      </section>

      {/* Top Collections Slider */}
      <section className="category-section collections-section">
        <div className="container">
          <div className="section-header-wrap">
            <span className="section-badge-pill">CATEGORIES</span>
            <h2 className="section-title">TOP COLLECTIONS</h2>
          </div>
          <div className="product-grid">
            <Link href="/shop?category=ELF+BAR+VAPE" className="collection-card">
              <img src="/assets/products/elf-bar-ice-king-pro-watermelon-ice.jpeg" alt="Elf Bar Collection" />
              <div className="collection-overlay">
                <h3>Elf Bar</h3>
              </div>
            </Link>
            <Link href="/shop?category=AAOK+VAPE" className="collection-card">
              <img src="/assets/products/aaok-90000-blue-razz-ice.jpeg" alt="AAOK Collection" />
              <div className="collection-overlay">
                <h3>AAOK</h3>
              </div>
            </Link>
            <Link href="/shop?category=IGET+VAPE" className="collection-card">
              <img src="/assets/products/iget-move-b50000-grape-ice-and-blackcurrant.jpeg" alt="IGET Vape Collection" />
              <div className="collection-overlay">
                <h3>IGET Vape</h3>
              </div>
            </Link>
            <Link href="/shop?category=VAPE+KITS" className="collection-card">
              <img src="/assets/products/voopoo-drag-5-premium-vape-kit.jpeg" alt="Vape Kits Collection" />
              <div className="collection-overlay">
                <h3>Vape Kits</h3>
              </div>
            </Link>
            <Link href="/shop?category=TEREA" className="collection-card">
              <img src="/assets/products/terea-heated-tobacco-sticks.jpeg" alt="Terea Collection" />
              <div className="collection-overlay">
                <h3>Terea</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* AAOK Section */}
      {aaokProducts.length > 0 && (
        <section className="category-section">
          <div className="container">
            <div className="section-header-wrap">
              <span className="section-badge-pill">ULTRA HIGH PUFF</span>
              <h2 className="section-title">AAOK VAPE</h2>
            </div>
            {renderGrid(aaokProducts)}
          </div>
        </section>
      )}

      {/* IGET VAPE Section */}
      {igetProducts.length > 0 && (
        <section className="category-section">
          <div className="container">
            <div className="section-header-wrap">
              <span className="section-badge-pill">POPULAR VAPES</span>
              <h2 className="section-title">IGET VAPE</h2>
            </div>
            {renderGrid(igetProducts)}
          </div>
        </section>
      )}

      {/* VAPE KITS Section */}
      {kitProducts.length > 0 && (
        <section className="category-section">
          <div className="container">
            <div className="section-header-wrap">
              <span className="section-badge-pill">KITS, PODS & COILS</span>
              <h2 className="section-title">VAPE KITS</h2>
            </div>
            {renderGrid(kitProducts)}
          </div>
        </section>
      )}

      {/* TEREA Section */}
      {tereaProducts.length > 0 && (
        <section className="category-section">
          <div className="container">
            <div className="section-header-wrap">
              <span className="section-badge-pill">HEATED TOBACCO</span>
              <h2 className="section-title">TEREA</h2>
            </div>
            {renderGrid(tereaProducts)}
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="info-section">
        <div className="container">
          <div className="info-card-container">
            <div className="section-header-wrap">
              <span className="section-badge-pill">ABOUT OUR STORE</span>
              <h2 className="info-heading">Vape Shop Gurugram – Premium Disposable Vapes, Vape Kits & Pods</h2>
            </div>
            <p className="info-text">Welcome to Vape Shop Gurugram, your trusted vape store in Gurugram (Gurgaon), Haryana, delivering to Cyber City, Cyber Hub, Golf Course Road, Sohna Road, MG Road and every sector of the city. Our collection ranges from Elf Bar disposables (TE6000, EP8000, FS18000, Raya D3 Pro, Ice King Pro up to 40,000 puffs) and ultra high-puff AAOK devices (up to 90,000 puffs) to the IGET MOVE B50000 dual-flavour vape, VOOPOO Drag and Argus kits, Uwell Caliburn pods, coils and TEREA sticks for IQOS ILUMA. Whether you are a beginner or an experienced vaper, our store provides high-quality products to suit every preference.</p>

            <div className="section-header-wrap" style={{ marginTop: '40px' }}>
              <span className="section-badge-pill">OUR ADVANTAGES</span>
              <h3 className="info-heading-sub">Why Choose Vape Shop Gurugram?</h3>
            </div>
            
            <ul className="info-list">
              <li>
                <div className="info-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Premium and 100% authentic vape products.</span>
              </li>
              <li>
                <div className="info-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Disposable vapes from 6,000 up to 90,000 puffs, plus vape kits, pods and coils.</span>
              </li>
              <li>
                <div className="info-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Popular brands including Elf Bar, AAOK, IGET, VOOPOO, Uwell and more.</span>
              </li>
              <li>
                <div className="info-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Competitive pricing on all products.</span>
              </li>
              <li>
                <div className="info-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Fast and secure express delivery across all of Gurugram.</span>
              </li>
              <li>
                <div className="info-icon-badge">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span>Dedicated customer support for all enquiries.</span>
              </li>
            </ul>

            <div className="section-header-wrap" style={{ marginTop: '40px' }}>
              <span className="section-badge-pill">DELIVERY AREAS</span>
              <h3 className="info-heading-sub">Vape Delivery Across Gurugram</h3>
            </div>
            <p className="info-text">Looking for a vape shop near you in Gurugram? We deliver to every major area of the city. Pick yours to see delivery details.</p>
            <ul className="loc-area-links home-areas">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link href={`/vape-shop/${l.slug}`}>Vape Shop {l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
