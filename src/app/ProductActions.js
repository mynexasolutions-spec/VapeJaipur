'use client';

import { useState } from 'react';
import { useCart } from './CartContext';

const WA_PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z";

const MAX_QTY = 10;

export default function ProductActions({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const whatsappLink = () => {
    const message = `*NEW ORDER - Vape Shop Gurugram*\n----------------------------------------\n*Product:* ${product.title}\n*Quantity:* ${qty}\n*Price:* ${product.price}\n----------------------------------------\n\nPlease confirm availability and delivery details. Thank you!`;
    return `https://wa.me/919203902308?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="pd-actions">
      <div className="pd-qty-row">
        <span className="pd-qty-label">Quantity</span>
        <div className="pd-qty" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity" disabled={qty <= 1}>&minus;</button>
          <span aria-live="polite">{qty}</span>
          <button type="button" onClick={() => setQty(q => Math.min(MAX_QTY, q + 1))} aria-label="Increase quantity" disabled={qty >= MAX_QTY}>+</button>
        </div>
      </div>

      <div className="pd-btn-row">
        <button type="button" className="pd-btn pd-btn-cart" onClick={() => addToCart(product, qty)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          ADD TO CART
        </button>

        <a href={whatsappLink()} className="pd-btn pd-btn-wa" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d={WA_PATH} />
          </svg>
          BUY ON WHATSAPP
        </a>
      </div>
    </div>
  );
}
