// Suggestions list with pin and dismiss features
import React from 'react';

export default function Suggestions({ query, onSelect, onPin }) {
  const sampleSuggestions = [
    'Laptop stand',
    'Wireless earbuds',
    'Eco-friendly notebook',
    'Bluetooth keyboard'
  ];

  const filtered = sampleSuggestions.filter((item) =>
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
          className="suggestion-item flex justify-between items-center"
          tabIndex="0"
          role="option"
          onClick={() => onSelect(item)}
          onKeyDown={(e) => e.key === 'Enter' && onSelect(item)}
        >
          <span>{item}</span>
          <button
            type="button"
            className="ml-2 text-sm"
            aria-label="Pin suggestion"
            onClick={(e) => {
              e.stopPropagation();
              onPin(item);
            }}
          >
            📌
          </button>
        </li>
      ))}
    </ul>
  );
}
