import { defineConfig } from 'tsup';
import { readFileSync } from 'node:fs';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8')) as { version: string };

export default defineConfig({
  entry: ['src/cli.tsx'],
  format: ['esm'],
  outExtension() {
    return { js: '.js' };
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
  dts: false,
  clean: true,
  // Bundle @inkui-cli/* workspace packages into the CLI binary so it is self-contained.
  // ink and react stay external — they are real runtime dependencies.
  noExternal: [/@inkui\//],
  external: ['react', 'ink'],
  // Inject package version at build time so the binary always reports the correct version
  // without needing to resolve package.json at runtime.
  define: {
    __CLI_VERSION__: JSON.stringify(version),
  },
});
