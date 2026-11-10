import { products } from '../../../data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductActions from '../../ProductActions';
import ProductCard from '../../ProductCard';


const CATEGORY_LABELS = {
  'ELF BAR VAPE': 'Elf Bar',
  'AAOK VAPE': 'AAOK',
  'IGET VAPE': 'IGET Vape',
  'VAPE KITS': 'Vape Kits',
  'TEREA': 'Terea',
};

function parseSpec(spec) {
  const m = spec.match(/^([^:]{1,40}):\s*(.+)$/);
  return m ? { key: m[1], value: m[2] } : { key: null, value: spec };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found | Vape Shop Jaipur",
    };
  }

  // Extracting plain text from the description for the meta description
  // If the product doesn't have a specific description, use a generic one
  const cleanDescription = product.description
    ? product.description.substring(0, 150) + "..."
    : `Buy ${product.title} online in Jaipur. Fast delivery, premium quality, and 100% authentic products. Order now on Vape Shop Jaipur.`;

  return {
    title: `${product.title} | Buy Online in Jaipur`,
    description: cleanDescription,
    keywords: `${product.title}, buy ${product.title} jaipur, ${product.category} jaipur, vape shop jaipur`,
    openGraph: {
      title: `${product.title} | Vape Shop Jaipur`,
      description: cleanDescription,
      url: `https://vapeshopjaipur.in/product/${product.slug}`,
      images: [{ url: product.image, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Vape Shop Jaipur`,
      description: cleanDescription,
      images: [product.image],
    }
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const numericPrice = (product.price || '').replace(/[^0-9.]/g, '').replace(/\.0+$/, '');
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.image.startsWith('/') ? product.image : '/' + product.image,
    "description": product.description || `Buy ${product.title} in Jaipur. Fast delivery, 100% authentic products.`,
    "brand": {
      "@type": "Brand",
      "name": product.category ? product.category.replace(" VAPE", "") : "Vape"
    },
    ...(numericPrice ? {
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": numericPrice,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Vape Shop Jaipur"
        }
      }
    } : {})
  };

  const categoryLabel = CATEGORY_LABELS[product.category] || product.category || 'Vapes';
  const imageSrc = product.image.startsWith('/') ? product.image : '/' + product.image;
  const specs = (product.specs || []).map(parseSpec);
  const quickFacts = specs.filter(sp => sp.key !== 'Brand').slice(0, 4);
  const paragraphs = (product.description || '').split('\n\n').filter(Boolean);

  // Related products: same category first, then others
  const related = [
    ...products.filter(p => p.slug !== slug && p.category === product.category),
    ...products.filter(p => p.slug !== slug && p.category !== product.category),
  ].slice(0, 4);

  const trust = [
    { title: 'Express Delivery', text: 'Across Jaipur', icon: <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></> },
    { title: '100% Authentic', text: 'Genuine products', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></> },
    { title: 'Cash on Delivery', text: 'Pay at your door', icon: <><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></> },
    { title: 'WhatsApp Support', text: '24/7 ordering help', icon: <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z" /> },
  ];

  return (
    <main className="pd-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="pd-container">
        <nav className="pd-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`}>{categoryLabel}</Link>
          <span>/</span>
          <span className="current">{product.title}</span>
        </nav>

        <div className="pd-grid">
          {/* Left: image */}
          <div className="pd-media">
            <div className="pd-media-card">
              <span className="pd-media-stock"><i></i>In Stock</span>
              <img src={imageSrc} alt={product.title} />
            </div>
          </div>

          {/* Right: details */}
          <div className="pd-info">
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="pd-cat">{categoryLabel}</Link>
            <h1 className="pd-title">{product.title}</h1>

            {quickFacts.length > 0 && (
              <ul className="pd-facts">
                {quickFacts.map((f, i) => (
                  <li key={i}>
                    {f.key ? <><span>{f.key}</span><strong>{f.value}</strong></> : <strong>{f.value}</strong>}
                  </li>
                ))}
              </ul>
            )}

            <div className="pd-price-card">
              <div>
                <span className="pd-price-label">Price</span>
                <span className="pd-price">{product.price}</span>
              </div>
              <span className="pd-ready">Ready to ship in Jaipur</span>
            </div>

            <ProductActions product={product} />

            <div className="pd-trust">
              {trust.map(t => (
                <div key={t.title} className="pd-trust-item">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{t.icon}</svg>
                  <div>
                    <strong>{t.title}</strong>
                    <span>{t.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details sections */}
        <div className="pd-details">
          <section className="pd-panel">
            <h2>Product Description</h2>
            <div className="pd-desc">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {specs.length > 0 && (
            <section className="pd-panel">
              <h2>Specifications</h2>
              <dl className="pd-specs">
                {specs.map((sp, i) => (
                  <div key={i} className={`pd-spec-row ${sp.key ? '' : 'pd-spec-single'}`}>
                    {sp.key ? (
                      <>
                        <dt>{sp.key}</dt>
                        <dd>{sp.value}</dd>
                      </>
                    ) : (
                      <dd>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                        {sp.value}
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          )}

          {product.highlights && product.highlights.length > 0 && (
            <section className="pd-panel">
              <h2>Highlights</h2>
              <ul className="pd-highlights">
                {product.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <div className="pd-policies">
          <details className="pd-policy">
            <summary>Return Policy <span aria-hidden="true">+</span></summary>
            <p>We do not accept returns on disposable vapes, e-liquids or coils due to health and safety regulations. If your device is defective upon arrival, please contact us within 24 hours.</p>
          </details>
          <details className="pd-policy">
            <summary>Shipping Policy <span aria-hidden="true">+</span></summary>
            <p>Orders are processed within 24 hours. We offer fast express shipping across Jaipur and standard shipping to other major cities.</p>
          </details>
          <details className="pd-policy">
            <summary>Privacy Policy <span aria-hidden="true">+</span></summary>
            <p>Your privacy is important to us. We securely store your information and will never share your personal details with third parties without your explicit consent.</p>
          </details>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="pd-related">
            <div className="pd-related-head">
              <span className="ab-kicker">More to Explore</span>
              <h2 className="ab-h2">You May Also Like</h2>
            </div>
            <div className="shop-product-grid pd-related-grid">
              {related.map(rec => (
                <ProductCard key={rec.slug} product={rec} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
