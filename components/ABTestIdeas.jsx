export default function ABTestIdeas({ ideas }) {
  if (!ideas?.length) return null;
  return (
    <section className="space-y-4 rounded-lg border p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-brand-dark">5. A/B test ideas</h2>
      <ul className="list-disc space-y-2 pl-5 text-gray-700">
        {ideas.map((idea, idx) => (
          <li key={idx}>{idea}</li>
        ))}
      </ul>
    </section>
  );
}
