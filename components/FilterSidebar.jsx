import { useState } from 'react';

/** Sidebar with category, type, license, and price filters */
export default function FilterSidebar({ filters, setFilters }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden bg-orange-500 text-white px-3 py-2 rounded"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
      >
        Filters
      </button>

      <aside
        className={`${
          open ? 'block' : 'hidden md:block'
        } fixed md:static top-0 right-0 md:right-auto h-full md:h-auto w-64 bg-white border-r shadow md:shadow-none z-20 p-4 overflow-auto`}
      >
        <h2 className="font-semibold mb-2">Filter Results</h2>

        <fieldset className="mb-4">
          <legend className="text-sm font-medium mb-1">Categories</legend>
          {['Graphics', 'Audio', 'Templates', 'Fonts'].map((cat) => (
            <label key={cat} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    categories: f.categories.includes(cat)
                      ? f.categories.filter((c) => c !== cat)
                      : [...f.categories, cat],
                  }))
                }
              />
              <span>{cat}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-sm font-medium mb-1">License</legend>
          {['Regular', 'Extended', 'Subscription'].map((lic) => (
            <label key={lic} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.licenses.includes(lic)}
                onChange={() =>
                  setFilters((f) => ({
                    ...f,
                    licenses: f.licenses.includes(lic)
                      ? f.licenses.filter((l) => l !== lic)
                      : [...f.licenses, lic],
                  }))
                }
              />
              <span>{lic}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="mb-4">
          <legend className="text-sm font-medium mb-1">Price up to</legend>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxPrice: e.target.value }))
            }
          />
          <span className="ml-2">${filters.maxPrice}</span>
        </fieldset>

        <button
          className="mt-4 bg-gray-200 px-3 py-2 rounded"
          onClick={() => setOpen(false)}
        >
          Close
        </button>
      </aside>
    </>
  );
}
