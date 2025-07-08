// Individual clickable tool card with accessible interactions
import React from 'react';

export default function ToolCard({ tool }) {
  const Icon = tool.icon;
  return (
    <Link href={`/tools/${tool.id}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-brand-orange">
      <article
        aria-labelledby={`${tool.id}-title`}
        className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
      >
         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2
          id={`${tool.id}-title`}
          className="mt-4 text-lg font-semibold text-brand-dark"
        >
          {tool.title}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{tool.description}</p>
        <span className="pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent transition group-hover:border-brand-orange" />
      </article>
    </Link>
  );
}
