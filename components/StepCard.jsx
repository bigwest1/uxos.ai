import { useState } from 'react';
import { StarIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

export default function StepCard({ step, index }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="card">
      <button
        className="flex w-full items-center justify-between p-5 text-left hover:bg-gray-700 transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
            {index + 1}
          </span>
          <span className="text-lg font-semibold text-gray-100">{step.title}</span>
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="space-y-4 border-t border-gray-700 p-5"
          >
          {(step.frames || step.image) && (
            <div className="grid grid-cols-2 gap-2">
              {(step.frames || [step.image]).map((src, i) => (
                src && (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-28 w-full rounded-lg object-cover"
                  />
                )
              ))}
            </div>
          )}
          <p className="mt-3 text-gray-300">{step.summary}</p>
          {step.rating && (
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: step.rating }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
              ))}
            </div>
          )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
