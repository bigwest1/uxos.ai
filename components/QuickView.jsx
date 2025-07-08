/** Modal showing product details */
export default function QuickView({ product, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded w-80 shadow-lg">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <img src={`/images/${product.id}.jpg`} alt={product.name} style={{ width: '100%' }} />

        <p className="mt-2 text-sm text-gray-600">by {product.author}</p>
        <p className="text-sm">Rating: {product.rating}★</p>
        <p className="text-sm">
          License: <strong>{product.license}</strong>
        </p>
        <p className="mt-1 font-semibold">{product.price}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-orange-500 text-white py-1 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
