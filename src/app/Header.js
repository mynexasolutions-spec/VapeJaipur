'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { products } from '../data/products';
import { useCart } from './CartContext';

function NavigationLinks({ handleNavLinkClick }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams ? searchParams.get('category') : null;

  const isLinkActive = (href, categoryParam) => {
    if (categoryParam) {
      return pathname === '/shop' && currentCategory === categoryParam;
    }
    if (href === '/shop') {
      return pathname === '/shop' && !currentCategory;
    }
    return pathname === href;
  };

  return (
    <nav className="nav-links" aria-label="Main menu">
      <div className="nav-drawer-head">
        <span className="nav-drawer-title">MENU</span>
        <label htmlFor="nav-toggle" className="nav-drawer-close" aria-label="Close menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </label>
      </div>
      <Link href="/" className={isLinkActive('/', null) ? 'active' : ''} onClick={handleNavLinkClick}>HOME</Link>
      <Link href="/shop" className={isLinkActive('/shop', null) ? 'active' : ''} onClick={handleNavLinkClick}>SHOP ALL</Link>
      <Link href="/shop?category=ELF+BAR+VAPE" className={isLinkActive('/shop', 'ELF BAR VAPE') ? 'active' : ''} onClick={handleNavLinkClick}>ELF BAR</Link>
      <Link href="/shop?category=AAOK+VAPE" className={isLinkActive('/shop', 'AAOK VAPE') ? 'active' : ''} onClick={handleNavLinkClick}>AAOK</Link>
      <Link href="/shop?category=IGET+VAPE" className={isLinkActive('/shop', 'IGET VAPE') ? 'active' : ''} onClick={handleNavLinkClick}>IGET VAPE</Link>
      <Link href="/shop?category=VAPE+KITS" className={isLinkActive('/shop', 'VAPE KITS') ? 'active' : ''} onClick={handleNavLinkClick}>VAPE KITS</Link>
      <Link href="/shop?category=TEREA" className={isLinkActive('/shop', 'TEREA') ? 'active' : ''} onClick={handleNavLinkClick}>TEREA</Link>
      <Link href="/about" className={isLinkActive('/about', null) ? 'active' : ''} onClick={handleNavLinkClick}>ABOUT US</Link>
      <div className="nav-drawer-foot">
        <a href="https://wa.me/919828275698" target="_blank" rel="noreferrer" className="nav-drawer-wa" onClick={handleNavLinkClick}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          Order on WhatsApp
        </a>
        <p>Gurugram, Haryana &bull; Express delivery</p>
      </div>
    </nav>
  );
}

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { cart, removeFromCart, updateQuantity, clearCart, totalCount, isCartOpen, setIsCartOpen } = useCart();

  const handleNavLinkClick = () => {
    setIsNavOpen(false);
  };

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Build structured WhatsApp message for cart items
  const generateWhatsAppCartLink = () => {
    if (cart.length === 0) return '#';
    let message = `*NEW CART ORDER - Vape Shop Gurugram*\n----------------------------------------\n\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n   - Quantity: ${item.quantity}\n   - Price: ${item.price}\n\n`;
    });
    message += `----------------------------------------\n*Total Items:* ${totalCount}\n\nPlease confirm availability and payment details. Thank you!`;

    return `https://wa.me/919828275698?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      <header className="main-header" id="header">
        <div className="header-container">
          <input 
            type="checkbox" 
            id="nav-toggle" 
            className="nav-toggle" 
            checked={isNavOpen}
            onChange={(e) => setIsNavOpen(e.target.checked)}
          />
          
          <div className="logo">
            <Link href="/" onClick={handleNavLinkClick}>
              <img src="/assets/logo.png" alt="Vape Shop Gurugram Logo" />
            </Link>
          </div>
          
          <Suspense fallback={<nav className="nav-links"></nav>}>
            <NavigationLinks handleNavLinkClick={handleNavLinkClick} />
          </Suspense>

          <label htmlFor="nav-toggle" className="nav-backdrop" aria-hidden="true"></label>

          <div className="header-icons">
            <a
              href="https://wa.me/919828275698"
              target="_blank"
              rel="noreferrer"
              className="nav-wa-btn"
              aria-label="Order on WhatsApp"
            >
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>Order Now</span>
            </a>
            <button aria-label="Search" onClick={() => setIsSearchOpen(true)} className="search-trigger-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
            <button aria-label="Shopping Cart" className="cart-btn" onClick={() => setIsCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalCount > 0 && <span className="cart-count">{totalCount}</span>}
            </button>
            
            <label htmlFor="nav-toggle" className="nav-toggle-label">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
      </header>

      {/* Interactive Search Modal */}
      {isSearchOpen && (
        <div className="search-modal-backdrop" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" style={{ marginRight: '12px' }}>
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search Elf Bar, AAOK, IGET, VOOPOO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="search-modal-input"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="clear-search-btn">
                    ✕
                  </button>
                )}
              </form>
              <button onClick={() => setIsSearchOpen(false)} className="close-modal-btn">
                ✕
              </button>
            </div>

            {/* Quick Search Suggestions */}
            {searchQuery.trim() === '' && (
              <div className="quick-search-tags">
                <span className="quick-tag-label">POPULAR SEARCHES:</span>
                {['Elf Bar', 'AAOK', 'IGET', 'VOOPOO', 'Terea'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className="modal-tag-pill"
                    onClick={() => setSearchQuery(tag)}
                  >
                    ⚡ {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Instant Search Results */}
            {searchQuery.trim() !== '' && (
              <div className="search-results-list">
                {searchResults.length > 0 ? (
                  searchResults.map(product => (
                    <Link
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      className="search-result-item"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img src={product.image.startsWith('/') ? product.image : '/' + product.image} alt={product.title} className="search-item-img" />
                      <div className="search-item-info">
                        <span className="search-item-title">{product.title}</span>
                        <span className="search-item-price">{product.price}</span>
                      </div>
                      <div className="search-item-arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="no-search-results">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive WhatsApp Quick Order Cart Drawer */}
      {isCartOpen && (
        <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-header-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <h3>Shopping Cart</h3>
                <span className="cart-badge-count">{totalCount} Items</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="close-cart-btn">
                ✕
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="cart-items-list">
                  {cart.map(item => (
                    <div key={item.slug} className="cart-item-card">
                      <img src={item.image.startsWith('/') ? item.image : '/' + item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4 className="cart-item-title">{item.title}</h4>
                        <span className="cart-item-price">{item.price}</span>
                        <div className="cart-item-qty-controls">
                          <button onClick={() => updateQuantity(item.slug, -1)} className="qty-btn">-</button>
                          <span className="qty-val">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.slug, 1)} className="qty-btn">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.slug)} className="delete-cart-item-btn" aria-label="Delete item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff4757" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer-footer">
                  <div className="cart-summary">
                    <span>Total Items:</span>
                    <strong>{totalCount} Units</strong>
                  </div>
                  <a
                    href={generateWhatsAppCartLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="cart-whatsapp-order-btn"
                  >
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    ORDER CART ON WHATSAPP
                  </a>
                  <button onClick={clearCart} className="clear-all-cart-btn">
                    Clear Cart
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart-view">
                <div className="empty-cart-icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <p>Your cart is empty.</p>
                <Link href="/shop" onClick={() => setIsCartOpen(false)} className="start-shopping-btn">
                  Explore Products
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
