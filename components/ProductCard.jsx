import { useState } from 'react';
import QuickView from './QuickView';



/** Displays a single product with quick view on click/hover */
export default function ProductCard({ product }) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <article
        className="border rounded shadow-sm hover:shadow-lg transition p-3 bg-white"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="thumbnail rounded"
        />
        <h3 className="mt-2 font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-500">by {product.author}</p>
        <p className="text-sm">Rating: {product.rating}★</p>
        <p className="text-sm">
          License: <strong>{product.license}</strong>
        </p>
        <p className="mt-1 font-semibold">{product.price}</p>
        <button
          className="mt-2 w-full bg-orange-500 text-white py-1 rounded"
          onClick={() => setShowPreview(true)}
        >
          Quick View
        </button>
      </article>

      {showPreview && (
        <QuickView product={product} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
}
