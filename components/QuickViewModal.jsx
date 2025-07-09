import React from 'react';

export default function QuickViewModal({ product, onClose }) {
  return (

    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-11/12 max-w-sm rounded bg-white p-4">
        <h3>{product.name}</h3>
        <img src={`/images/${product.id}.jpg`} alt={product.name} className="thumbnail" />
        <p>{product.price}</p>
        <p>Rating: {product.rating}★</p>
        <button
          className="mt-2 w-full bg-brand-orange py-2 text-white"
          onClick={() => alert('Added to cart')}
        >
          Add to Cart
        </button>
        <button
          className="mt-2 w-full bg-gray-200 py-2"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}