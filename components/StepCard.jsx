import { useState } from 'react';
import { StarIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function StepCard({ step, index }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <button
        className="flex w-full items-center justify-between p-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="rounded bg-brand-orange px-2 py-1 text-sm font-bold text-white">
            {index + 1}
          </span>
          <span className="font-medium">{step.title}</span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="space-y-3 border-t p-4">
          {step.frames
            ? step.frames.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="h-40 w-full rounded object-cover"
                />
              ))
            : step.image && (
                <img
                  src={step.image}
                  alt=""
                  className="h-40 w-full rounded object-cover"
                />
              )}
          <p className="text-sm text-gray-700">{step.summary}</p>
          {step.rating && (
            <div className="flex items-center gap-1">
              {Array.from({ length: step.rating }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-yellow-500" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}