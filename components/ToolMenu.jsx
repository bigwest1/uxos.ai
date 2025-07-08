// Responsive grid menu displaying all available tools
import React from 'react';
import ToolCard from './ToolCard';

export default function ToolMenu({ tools }) {
  return (
    <section
      aria-label="Available tools"
      className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </section>
  );
}
