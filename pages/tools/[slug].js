import Head from 'next/head';
import { tools } from '../../data/tools';

export async function getStaticPaths() {
  const paths = tools.map((tool) => ({ params: { slug: tool.id } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const tool = tools.find((t) => t.id === params.slug);
  if (!tool) {
    return { notFound: true };
  }
  const { id, title, description } = tool;
  return { props: { tool: { id, title, description } } };
}

export default function ToolPage({ tool }) {
  const found = tools.find((t) => t.id === tool.id);
  const Icon = found.icon;
  return (
    <>
      <Head>
        <title>{tool.title} - UXOS Tools</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-dark text-white">
            <Icon className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-brand-dark">{tool.title}</h1>
          <p className="text-gray-700">{tool.description}</p>
        </div>
      </main>
    </>
  );
}

