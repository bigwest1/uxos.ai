// Suggestions.jsx
import React from 'react';

const sampleSuggestions = [
  'Laptop stand',
  'Wireless earbuds',
  'Eco-friendly notebook',
  'Bluetooth keyboard'
];

export default function Suggestions({ query, onSelect }) {
  // Filter suggestion list by the current query
  const filtered = sampleSuggestions.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  if (!query || filtered.length === 0) {
    return null;
  }

  return (
    <ul id="suggestions-list" className="suggestions" role="listbox">
      {filtered.map((item, idx) => (
        <li
          key={idx}
          className="suggestion-item"
          tabIndex="0"
          role="option"
          onClick={() => onSelect(item)}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
