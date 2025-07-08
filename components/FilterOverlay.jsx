// FilterOverlay.jsx
import React from 'react';

export default function FilterOverlay({ onClose }) {
  return (
    <div className="filter-overlay" role="dialog" aria-modal="true">
      <div className="filter-panel">
        <h3>Refine Results</h3>
        <label>
          Price Range
          <select>
            <option value="">Any</option>
            <option value="1">$0–$25</option>
            <option value="2">$25–$50</option>
          </select>
        </label>
        <label>
          Minimum Rating
          <select>
            <option value="">Any</option>
            <option value="4">4★ & up</option>
            <option value="5">5★ only</option>
          </select>
        </label>
        <button onClick={onClose}>Apply Filters</button>
      </div>
    </div>
  );
}
