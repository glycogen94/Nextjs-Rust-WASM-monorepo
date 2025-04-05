import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Next.js + Rust (WASM) Monorepo
      </h1>

      <p className="text-center max-w-xl mb-8">
        Welcome to your Next.js application with Rust WASM integration. This
        monorepo is set up with Turborepo, Tailwind CSS, Shadcn UI, and more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/demo"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
        >
          Try WASM Demo
        </Link>

        <a
          href="https://github.com/glycogen94/Nextjs-Rust-WASM-monorepo"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
        >
          View on GitHub
        </a>
      </div>
    </main>
  );
}
