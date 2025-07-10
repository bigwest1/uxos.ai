import Head from 'next/head';
import { useAppBuilder } from '../../contexts/AppBuilderContext';
import Mermaid from 'react-mermaid2';

export default function PreviewPage() {
  const { blueprint } = useAppBuilder();
  if (!blueprint) return <p className="p-6">No app blueprint found. Please generate one first.</p>;

  return (
    <>
      <Head>
        <title>{blueprint.appName} Preview</title>
      </Head>
      <main className="mx-auto max-w-4xl space-y-6 p-6">
        <header className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full" />
          <h1 className="text-3xl font-bold" style={{ color: blueprint.primaryColor }}>
            {blueprint.appName}
          </h1>
        </header>
        <section className="space-y-2">
          <h2 className="font-semibold">Onboarding Steps</h2>
          {blueprint.userOnboardingSteps.map((step, i) => (
            <div key={i} className="p-2 bg-gray-100 rounded">
              {step}
            </div>
          ))}
        </section>
        {blueprint.pages.map((pg, i) => (
          <section key={i} className="p-4 bg-white rounded shadow space-y-2">
            <h3 className="font-medium">{pg.name}</h3>
            <Mermaid chart={pg.mermaidFlow} />
          </section>
        ))}
        <section className="flex gap-2">
          {blueprint.monetizationOptions.map((opt) => (
            <button key={opt} className="btn btn-primary">
              {opt === 'subscription' ? 'Subscribe' : 'Buy Now'}
            </button>
          ))}
        </section>
      </main>
    </>
  );
}
