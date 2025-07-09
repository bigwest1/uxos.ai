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

    <ul
      id="suggestions-list"
      className="absolute z-10 w-full max-w-md border border-gray-300 bg-white"
      role="listbox"
    >
      {filtered.map((item, idx) => (
        <li
          key={idx}
          className="flex cursor-pointer items-center justify-between p-2 hover:bg-brand-orange hover:text-white focus:bg-brand-orange focus:text-white"
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