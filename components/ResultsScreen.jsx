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

      <header className="flex items-center justify-between bg-brand-dark p-4 text-white">
        <button onClick={onBack} aria-label="Back">Back</button>
        <h2>Search Results</h2>
      </header>


      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
 
          <article key={product.id} className="relative overflow-hidden rounded border border-gray-300">
            <img src={`/images/${product.id}.jpg`} alt={product.name} className="thumbnail" />

            <div className="absolute right-2 top-2 flex gap-1">
              <button

                className="bg-white/90 p-1 px-2 hover:bg-brand-orange focus:bg-brand-orange hover:text-white focus:text-white"
                aria-label="Pin to compare"
                onClick={() => togglePin(product)}
              >
                📌
              </button>
              <button

                className="bg-white/90 p-1 px-2 hover:bg-brand-orange focus:bg-brand-orange hover:text-white focus:text-white"
                aria-label="Quick view"
                onClick={() => setQuickView(product)}
              >
                👁
              </button>
            </div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>

          <button className="mt-2 w-full bg-brand-orange py-1 text-white" onClick={() => alert('Added to cart')}>
            Add to Cart
          </button>
          </article>
        ))}
      </div>

      <button

        className="fixed bottom-4 right-4 rounded-full bg-brand-orange p-3 text-white"
        aria-label="Filter results"
        onClick={() => setShowFilter(true)}
      >
        ☰
      </button>

      {pinned.length > 0 && (

        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-brand-dark p-2 text-white" aria-label="Comparison tray">
          <span>{pinned.length} item(s) pinned</span>
          <button onClick={() => alert('Added all to cart')}>Add All to Cart</button>
        </div>
      )}

      {showFilter && <FilterOverlay onClose={() => setShowFilter(false)} />}
      {quickView && <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />}
    </div>
  );
}