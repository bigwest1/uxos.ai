import { useState } from 'react';

/** Search bar with live suggestions and recent searches */
export default function SearchBar({ suggestions, onSearch, recent, addRecent }) {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      addRecent(query);
      setShowList(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex">
        <label htmlFor="search" className="sr-only">
          Search items
        </label>
        <input
          id="search"
          type="text"
          className="flex-1 border border-gray-300 rounded-l-md p-2"
          placeholder="Search items..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowList(true);
          }}
          onFocus={() => setShowList(true)}
          aria-autocomplete="list"
          aria-controls="suggestions"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 rounded-r-md"
        >
          Search
        </button>
      </form>

      {showList && filtered.length > 0 && (
        <ul
          id="suggestions"
          role="listbox"
          className="absolute z-10 w-full bg-white border border-gray-200 rounded-b-md shadow"
        >
          {filtered.map((item, idx) => (
            <li
              key={idx}
              role="option"
              tabIndex={0}
              className="px-4 py-2 cursor-pointer hover:bg-orange-50"
              onClick={() => {
                setQuery(item);
                onSearch(item);
                addRecent(item);
                setShowList(false);
              }}
              onKeyDown={(e) =>
                e.key === 'Enter' &&
                (() => {
                  setQuery(item);
                  onSearch(item);
                  addRecent(item);
                  setShowList(false);
                })()
              }
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Recent searches dropdown */}
      {recent.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          Recent:{' '}
          {recent.map((r, i) => (
            <button
              key={i}
              className="underline mr-2 hover:text-orange-600"
              onClick={() => onSearch(r)}
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
