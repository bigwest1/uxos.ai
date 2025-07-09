import { LightBulbIcon } from '@heroicons/react/24/outline';

export default function ABTestIdeas({ ideas }) {
  return (
    <section className="space-y-4 rounded-lg border p-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold text-brand-dark">4. A/B Test Ideas</h2>
      <ul className="space-y-2">
        {ideas.map((idea, i) => (
          <li key={i} className="flex items-start gap-2">
            <LightBulbIcon className="mt-1 h-5 w-5 text-brand-orange" />
            <p className="text-gray-800">{idea}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
