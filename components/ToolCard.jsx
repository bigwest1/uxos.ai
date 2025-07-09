import Link from 'next/link';

export default function ToolCard({ tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={`/tools/${tool.id}`}
      className="group block rounded-xl bg-gray-800 p-8 text-center transition-transform hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-indigo-400">
        <Icon className="h-12 w-12" aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300">
        {tool.title}
      </h3>
      <p className="mt-2 text-gray-400">{tool.description}</p>
    </Link>
  );
}
