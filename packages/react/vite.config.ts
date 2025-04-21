/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/packages/react',
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx']
    }),
    dts({
      entryRoot: 'src',
      outDir: 'lib',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      insertTypesEntry: true,
      exclude: ['**/*.stories.tsx']
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: 'es',
    emptyOutDir: true,
    // reportCompressedSize: true,
    // commonjsOptions: {
    //   transformMixedEsModules: true,
    // },
    minify: false,
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'es',
          exports: 'named',
          preserveModulesRoot: 'src'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: 'lib',
          exports: 'named',
          preserveModulesRoot: 'src'
        }
      ]
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: '@demo-mono-repo/react-demo',
      fileName: format => `index.${format}.js`,
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es', 'cjs']
    }
  },
}));
