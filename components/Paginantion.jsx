/** Simple pagination controls */
export default function Pagination({ page, setPage, total }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="flex justify-center space-x-2 mt-6" aria-label="Pagination">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-3 py-1 rounded ${
            page === p
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {p}
        </button>
      ))}
    </nav>
  );
}
