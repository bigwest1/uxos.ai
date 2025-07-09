import React from 'react';

const templates = [
  { id: 'summarize', label: 'Summarize' },
  { id: 'brainstorm', label: 'Brainstorm Ideas' },
  { id: 'rewrite', label: 'Rewrite for Tone' },
];

/**
 * Allow user to choose from common prompt templates.
 */
export default function PromptTemplateSelector({ onSelect }) {
  return (
    <div className="flex space-x-2">
      {templates.map((tpl) => (
        <button
          key={tpl.id}
          onClick={() => onSelect(tpl.id)}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
        >
          {tpl.label}
        </button>
      ))}
    </div>
  );
}
