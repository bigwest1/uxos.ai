import { useState, useMemo } from 'react';
import { products } from '../data/products';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';

/** Main product search page */
export default function Home() {
  const suggestions = products.map((p) => p.title);
  const [recent, setRecent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    licenses: [],
    maxPrice: 50,
  });

  // Add new search term to recent list
  const addRecent = (term) => {
    setRecent((r) => Array.from(new Set([term, ...r])).slice(0, 5));
    setSearchTerm(term);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) =>
        searchTerm
          ? p.title.toLowerCase().includes(searchTerm.toLowerCase())
          : true
      )
      .filter((p) =>
        filters.licenses.length > 0
          ? filters.licenses.includes(p.license)
          : true
      )
      .filter((p) => parseInt(p.price.replace('$', '')) <= filters.maxPrice);
  }, [searchTerm, filters]);

  const pageSize = 6;
  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const paged = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white p-4">
        <h1 className="text-xl font-semibold">Digital Marketplace</h1>
      </header>

      <main className="max-w-7xl mx-auto p-4 flex">
        <FilterSidebar filters={filters} setFilters={setFilters} />

        <div className="flex-1">
          <SearchBar
            suggestions={suggestions}
            onSearch={addRecent}
            recent={recent}
            addRecent={addRecent}
          />

          <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {paged.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination page={page} setPage={setPage} total={pageCount} />
        </div>
      </main>
    </div>
  );
}
