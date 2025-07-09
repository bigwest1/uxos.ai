import Link from 'next/link';

export default function ToolCard({ tool }) {
  const Icon = tool.icon;
  return (
    <Link href={`/tools/${tool.id}`} passHref>
      <a className="group block rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
        <div className="mx-auto mb-4 h-12 w-12 text-brand-orange group-hover:text-brand-dark">
          <Icon className="h-12 w-12" aria-hidden />
        </div>
        <h3 className="text-lg font-semibold text-brand-dark group-hover:text-brand-orange">
          {tool.title}
        </h3>
        <p className="mt-2 text-gray-600">{tool.description}</p>
      </a>
    </Link>
  );
}
