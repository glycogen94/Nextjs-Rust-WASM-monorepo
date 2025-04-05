import type * as Wasm from 'wasm-lib';

let wasmModule: typeof Wasm | null = null;

export const loadWasm = async (): Promise<typeof Wasm> => {
  if (wasmModule) {
    return wasmModule;
  }

  try {
    // Dynamic import! The path should resolve correctly due to workspace:*
    const loaded = await import('wasm-lib');

    // Initialize the module if necessary - depends on wasm-pack output
    await loaded.default?.(); // This line may not be needed depending on wasm-pack version

    // Set up panic hook for better error messages
    loaded.setup_panic_hook?.();

    wasmModule = loaded;
    return loaded;
  } catch (error) {
    console.error('Failed to load WASM module:', error);
    throw error;
  }
};

// Helper functions to access specific WASM functionalities
export const getWasmGreet = async () => (await loadWasm()).greet;
export const getWasmAdd = async () => (await loadWasm()).add;
export const getWasmFibonacci = async () => (await loadWasm()).fibonacci_fast;
