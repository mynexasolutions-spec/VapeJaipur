import Link from 'next/link';
import { products } from '../../data/products';
import ProductCard from '../ProductCard';
import { canonical } from '../../data/site';


const categories = [
  { name: "ALL PRODUCTS", label: "All Products", param: undefined, blurb: "Browse premium authentic vapes, kits, pods and coils with fast express delivery across Gurugram." },
  { name: "ELF BAR", label: "Elf Bar", param: "ELF BAR VAPE", blurb: "High-puff Elf Bar disposables: TE6000, EP8000, FS18000, Raya D3 and Ice King Pro." },
  { name: "AAOK", label: "AAOK", param: "AAOK VAPE", blurb: "Ultra high-puff AAOK disposables from 15,000 up to 90,000 puffs." },
  { name: "IGET VAPE", label: "IGET Vape", param: "IGET VAPE", blurb: "IGET MOVE B50000 dual-flavour rechargeable disposable." },
  { name: "VAPE KITS", label: "Vape Kits", param: "VAPE KITS", blurb: "VOOPOO and Uwell vape kits, pods and coils." },
  { name: "TEREA", label: "Terea", param: "TEREA", blurb: "TEREA heated tobacco sticks for IQOS ILUMA devices." },
];

const sortOptions = [
  { key: undefined, label: "Featured" },
  { key: "az", label: "A to Z" },
  { key: "za", label: "Z to A" },
];

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params.category;

  if (category) {
    return {
      title: { absolute: `${category} in Gurugram | Buy Online | Vape Shop Gurugram` },
      description: `Buy premium ${category} vapes and accessories in Gurugram (Gurgaon). Fast delivery to Cyber City, Golf Course Road, Sohna Road & all sectors. 100% authentic products.`,
      alternates: canonical(`/shop?category=${encodeURIComponent(category)}`),
    };
  }

  return {
    title: { absolute: "Shop All Vapes in Gurugram | Disposable Vapes & Pods | Vape Shop Gurugram" },
    description: "Browse our complete collection of disposable vapes, vape kits, pods and coils in Gurugram (Gurgaon). Shop top brands like Elf Bar, AAOK, IGET and VOOPOO with fast delivery across the city.",
    alternates: canonical('/shop'),
  };
}

function buildHref({ category, q, sort }) {
  const qs = new URLSearchParams();
  if (category) qs.set('category', category);
  if (q) qs.set('q', q);
  if (sort) qs.set('sort', sort);
  const str = qs.toString();
  return str ? `/shop?${str}` : '/shop';
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const activeCategory = params.category;
  const searchQuery = params.q;
  const sort = params.sort === 'az' || params.sort === 'za' ? params.sort : undefined;

  let filteredProducts = products;
  if (activeCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === activeCategory);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }
  if (sort) {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      sort === 'az' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
  }

  const activeMeta = categories.find(c => c.param === activeCategory) || categories[0];
  const pageTitle = searchQuery ? `Search: "${searchQuery}"` : activeMeta.label;
  const pageBlurb = searchQuery
    ? `Showing results for "${searchQuery}"${activeCategory ? ` in ${activeMeta.label}` : ''}.`
    : activeMeta.blurb;

  return (
    <main className="shop-page-wrapper">
      <div className="container">
        <div className="shop-header-banner">
          <nav className="shop-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            {activeCategory || searchQuery ? <Link href="/shop">Shop</Link> : <span className="current">Shop</span>}
            {(activeCategory || searchQuery) && (
              <>
                <span>/</span>
                <span className="current">{pageTitle}</span>
              </>
            )}
          </nav>
          <span className="shop-badge">Explore Catalog</span>
          <h1 className="shop-page-title">{pageTitle}</h1>
          <p className="shop-subtitle">{pageBlurb}</p>
        </div>

        <div className="shop-toolbar">
          <span className="showing-count">
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>

          <form action="/shop" method="get" className="shop-search-form" role="search">
            {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
            {sort && <input type="hidden" name="sort" value={sort} />}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              name="q"
              defaultValue={searchQuery || ''}
              placeholder="Search products..."
              aria-label="Search products"
              maxLength={60}
            />
          </form>

          <div className="shop-sort">
            <span>Sort:</span>
            {sortOptions.map(opt => (
              <Link
                key={opt.label}
                href={buildHref({ category: activeCategory, q: searchQuery, sort: opt.key })}
                className={`shop-pill-btn ${sort === opt.key ? 'active' : ''}`}
              >
                {opt.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="shop-container">
          {/* Sidebar */}
          <aside className="shop-sidebar">
            <h3>Categories</h3>
            <ul className="shop-category-list">
              {categories.map(cat => {
                const isActive = activeCategory === cat.param || (!activeCategory && !cat.param);
                const count = cat.param ? products.filter(p => p.category === cat.param).length : products.length;
                return (
                  <li key={cat.name}>
                    <Link
                      href={cat.param ? `/shop?category=${encodeURIComponent(cat.param)}` : '/shop'}
                      className={`category-checkbox-item ${isActive ? 'active' : ''}`}
                    >
                      <div className={`checkbox-box ${isActive ? 'checked' : ''}`}>
                        {isActive && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      <span className="category-name">{cat.name}</span>
                      <span className="category-count">{count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Product Grid */}
          <section className="shop-products-area">
            {filteredProducts.length > 0 ? (
              <div className="shop-product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="shop-empty">
                <div className="shop-empty-icon">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <h3>No products found</h3>
                <p>We could not find anything{searchQuery ? ` for "${searchQuery}"` : ' in this category'}. Try another search or browse the full catalog.</p>
                <Link href="/shop" className="jp-hero-btn">VIEW ALL PRODUCTS</Link>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
