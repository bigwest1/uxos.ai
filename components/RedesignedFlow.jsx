import StepCard from './StepCard';

export default function RedesignedFlow({ steps }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-brand-dark">
        4. Redesigned flow
      </h2>
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <StepCard key={idx} step={step} index={idx} />
        ))}
      </div>
    </section>
  );
}
