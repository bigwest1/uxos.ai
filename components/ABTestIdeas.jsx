import { LightBulbIcon } from '@heroicons/react/24/outline';

export default function ABTestIdeas({ ideas }) {
  return (
    <section className="card space-y-6">
      <h2 className="text-2xl font-bold text-white">4. A/B Test Ideas</h2>
      <ul className="space-y-3">
        {ideas.map((idea, i) => (
          <li key={i} className="flex items-center gap-3">
            <LightBulbIcon className="h-6 w-6 text-indigo-400" />
            <p className="text-gray-300">{idea}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
