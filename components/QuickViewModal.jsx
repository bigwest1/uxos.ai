// QuickViewModal.jsx
import React from 'react';

export default function QuickViewModal({ product, onClose }) {
  return (
    <div className="filter-overlay" role="dialog" aria-modal="true">
      <div className="filter-panel">
        <h3>{product.name}</h3>
        <img src={`/images/${product.id}.jpg`} alt={product.name} style={{ width: '100%' }} />
        <p>{product.price}</p>
        <p>Rating: {product.rating}★</p>
        <button onClick={() => alert('Added to cart')}>Add to Cart</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
