import { StarIcon } from '@heroicons/react/24/solid';

export default function RedesignedFlow({ steps }) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-white">3. Redesigned Flow</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className="rounded-xl bg-gray-800 p-6 shadow-2xl transition-transform hover:-translate-y-1"
          >
            <div className="h-32 w-full animate-pulse rounded-lg bg-gray-700" />
            <h3 className="mt-4 text-lg font-semibold text-gray-100">
              {i + 1}. {step.title}
            </h3>
            <p className="mt-2 text-gray-300 text-sm">{step.summary}</p>
            {step.rating && (
              <div className="mt-3 flex items-center gap-1">
                {Array.from({ length: step.rating }).map((_, idx) => (
                  <StarIcon key={idx} className="h-5 w-5 text-yellow-300" />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
