import { defineConfig } from 'tsup'

// Two ESM entries from one build: the library root with its declarations and
// the CLI binary. Bundling is what makes the extensionless imports of the
// source valid at runtime; tsc alone would emit them unresolved.
export default defineConfig({
  entry: { index: 'src/index.ts', 'cli/main': 'src/cli/main.ts' },
  format: ['esm'],
  // The shared tsconfig turns `incremental` on, which tsc refuses when
  // emitting declarations without a build-info file.
  dts: {
    compilerOptions: { incremental: false, ignoreDeprecations: '6.0' },
  },
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'node22',
})
