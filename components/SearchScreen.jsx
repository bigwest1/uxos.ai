// SearchScreen.jsx
import React, { useState } from 'react';
import Suggestions from './Suggestions';

export default function SearchScreen({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Handle input changes with small debounce for live suggestions
  const handleChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <div>
      <header>
        <h1>Find Your Next Favorite Item</h1>
      </header>
      <form onSubmit={handleSubmit} style={{ position: 'relative', margin: '2rem auto', width: '100%', maxWidth: '500px' }}>
        <label htmlFor="search" className="visually-hidden">Search</label>
        <input
          id="search"
          type="text"
          className="search-bar"
          placeholder="Search for your next favorite item…"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
        />
        {showSuggestions && (
          <Suggestions
            query={query}
            onSelect={(val) => { setQuery(val); setShowSuggestions(false); onSearch(val); }}
          />
        )}
      </form>
    </div>
  );
}
