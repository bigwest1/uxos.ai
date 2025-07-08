// Search screen with expanding search bar, suggestions, voice input, and pinned chips
import React, { useState } from 'react';
import Suggestions from './Suggestions';
import VoiceSearchButton from './VoiceSearchButton';

export default function SearchScreen({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pinned, setPinned] = useState([]);

  const handleSelect = (val) => {
    setQuery(val);
    setShowSuggestions(false);
    onSearch(val);
  };

  const handlePin = (val) => {
    if (!pinned.includes(val)) {
      setPinned((prev) => [...prev, val]);
    }
  };

  const handleVoiceResult = (val) => {
    setQuery(val);
    onSearch(val);
  };

  return (
    <div>
      <header>
        <h1>Find Your Next Favorite Item</h1>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(query);
          setShowSuggestions(false);
        }}
        style={{ position: 'relative', margin: '2rem auto', width: '100%', maxWidth: '500px', display: 'flex' }}
      >
        <label htmlFor="search" className="visually-hidden">Search</label>
        <input
          id="search"
          type="text"
          className="search-bar flex-1"
          placeholder="Search for your next favorite item…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
        />
        <VoiceSearchButton onResult={handleVoiceResult} />
        {showSuggestions && (
          <Suggestions
            query={query}
            onSelect={handleSelect}
            onPin={handlePin}
          />
        )}
      </form>

      {/* Pinned suggestion chips */}
      {pinned.length > 0 && (
        <div className="pinned-chips" aria-label="Pinned searches">
          {pinned.map((item) => (
            <span key={item} className="chip">{item}</span>
          ))}
        </div>
      )}
    </div>
  );
}
