import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['__tests__/**/*.test.{ts,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
