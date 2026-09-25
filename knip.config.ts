import { createKnipConfig } from '@syntopica/quality-config/knip'

export default createKnipConfig({
  framework: 'ts-package',
  // src/index.ts is the library's public API, consumed by dependants rather
  // than by this repository; checking its exports would report the whole
  // surface as dead.
  includeEntryExports: false,
  // Spawned by the `secrets:check` script; installed on the machine, not as
  // a dependency.
  ignoreBinaries: ['gitleaks'],
})
