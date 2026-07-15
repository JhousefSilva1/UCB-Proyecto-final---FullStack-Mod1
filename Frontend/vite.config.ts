import { defineConfig } from 'vitest/config'
import react, {
  reactCompilerPreset,
} from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',

    // Ejecutar solamente pruebas unitarias dentro de src
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
})