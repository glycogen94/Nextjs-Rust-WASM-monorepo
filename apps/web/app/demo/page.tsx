'use client';

import { loadWasm } from '@/lib/wasmLoader';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function WasmDemo() {
  const [result, setResult] = useState<number | null>(null);
  const [greeting, setGreeting] = useState<string>('');
  const [fibResult, setFibResult] = useState<number | null>(null);
  const [fibIndex, setFibIndex] = useState<number>(10);
  const [wasmLoaded, setWasmLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load WASM module when the component mounts client-side
    const loadWasmModule = async () => {
      try {
        setLoading(true);
        await loadWasm();
        setWasmLoaded(true);
      } catch (err) {
        console.error('Error loading WASM module:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWasmModule();
  }, []);

  const handleAdd = async () => {
    if (!wasmLoaded) return;
    try {
      const wasm = await loadWasm();
      setResult(wasm.add(5, 7));
    } catch (err) {
      console.error('Error calling WASM add:', err);
    }
  };

  const handleGreet = async () => {
    if (!wasmLoaded) return;
    try {
      const wasm = await loadWasm();
      setGreeting(wasm.greet('Next.js & Rust'));
    } catch (err) {
      console.error('Error calling WASM greet:', err);
    }
  };

  const calculateFibonacci = async () => {
    if (!wasmLoaded || fibIndex < 0) return;
    try {
      const wasm = await loadWasm();
      setFibResult(wasm.fibonacci_fast(fibIndex));
    } catch (err) {
      console.error('Error calculating Fibonacci:', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-8">WebAssembly Demo</h1>

      {loading ? (
        <p className="mb-8">Loading WASM module...</p>
      ) : !wasmLoaded ? (
        <p className="text-red-500 mb-8">
          Failed to load WASM module. Check console for errors.
        </p>
      ) : (
        <div className="space-y-8 w-full max-w-md">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Addition</h2>
            <button
              type="button"
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
            >
              Calculate 5 + 7 using WASM
            </button>
            {result !== null && (
              <p className="text-lg">
                Result: <span className="font-semibold">{result}</span>
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">String Greeting</h2>
            <button
              type="button"
              onClick={handleGreet}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
            >
              Get Greeting from WASM
            </button>
            {greeting && (
              <p className="text-lg">
                Message: <span className="font-semibold">{greeting}</span>
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Fibonacci Sequence</h2>
            <div className="flex items-center mb-4">
              <label htmlFor="fibIndex" className="mr-2">
                Fibonacci Index:
              </label>
              <input
                id="fibIndex"
                type="number"
                value={fibIndex}
                onChange={(e) => setFibIndex(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20 text-center"
                min="0"
                max="40"
              />
            </div>
            <button
              type="button"
              onClick={calculateFibonacci}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
            >
              Calculate Fibonacci
            </button>
            {fibResult !== null && (
              <p className="text-lg">
                Fibonacci({fibIndex}) ={' '}
                <span className="font-semibold">{fibResult}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
