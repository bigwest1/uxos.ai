import React, { useState } from 'react';
import FilterOverlay from './FilterOverlay';
import QuickViewModal from './QuickViewModal';

const products = [
  { id: 1, name: 'Laptop Stand', price: '$29.99', rating: 4 },
  { id: 2, name: 'Wireless Earbuds', price: '$59.99', rating: 5 },
  { id: 3, name: 'Eco-Friendly Notebook', price: '$9.99', rating: 4 },
  { id: 4, name: 'Bluetooth Keyboard', price: '$39.99', rating: 4 }
];

export default function ResultsScreen({ onBack }) {
  const [pinned, setPinned] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [quickView, setQuickView] = useState(null);

  const togglePin = (product) => {
    setPinned((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div>
      <header>
        <button onClick={onBack} aria-label="Back">Back</button>
        <h2>Search Results</h2>
      </header>

      <div className="results-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <img src={`/images/${product.id}.jpg`} alt={product.name} className="thumbnail" />
            <div className="product-actions">
              <button
                className="action-button"
                aria-label="Pin to compare"
                onClick={() => togglePin(product)}
              >
                📌
              </button>
              <button
                className="action-button"
                aria-label="Quick view"
                onClick={() => setQuickView(product)}
              >
                👁
              </button>
            </div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => alert('Added to cart')}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>

      <button
        className="filter-button"
        aria-label="Filter results"
        onClick={() => setShowFilter(true)}
      >
        ☰
      </button>

      {pinned.length > 0 && (
        <div className="compare-tray" aria-label="Comparison tray">
          <span>{pinned.length} item(s) pinned</span>
          <button onClick={() => alert('Added all to cart')}>Add All to Cart</button>
        </div>
      )}

      {showFilter && <FilterOverlay onClose={() => setShowFilter(false)} />}
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}
