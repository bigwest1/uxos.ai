import { StarIcon } from '@heroicons/react/24/solid';

export default function RedesignedFlow({ steps }) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-brand-dark">3. Redesigned Flow</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="h-40 w-full animate-pulse rounded bg-gray-100" />
            <h3 className="mt-3 font-medium text-brand-dark">
              {i + 1}. {step.title}
            </h3>
            <p className="mt-2 text-gray-700 text-sm">{step.summary}</p>
            {step.rating && (
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: step.rating }).map((_, idx) => (
                  <StarIcon key={idx} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
