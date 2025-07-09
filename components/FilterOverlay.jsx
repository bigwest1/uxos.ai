import React from 'react';

export default function FilterOverlay({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-11/12 max-w-sm rounded bg-white p-4">
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
        <button
          className="mt-4 bg-brand-orange px-3 py-2 text-white"
          onClick={onClose}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}