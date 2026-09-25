# Contributing

## Ground rules

- Every command is read-only unless its name says otherwise, and nothing here
  performs a legal act (opening a notification, filing, signing, paying,
  confirming data) without an explicit flag whose name states the act. A pull
  request that adds such an act needs the flag, a description of the legal
  effect in the README, and a test proving the act never runs without the flag.
- No runtime dependencies. The package speaks HTTPS with `node:https`, parses
  with regular expressions over the small, stable pages the portals emit, and
  decodes with `TextDecoder`. Keep it that way; the attack surface of a tool
  that holds a qualified certificate is the point.
- No real data in the repository. Fixtures are synthetic: invented NIFs, names,
  references and amounts, with the exact structure the portal emits. If you
  captured a real page to understand it, rewrite it before committing.
- English everywhere: code, comments, tests, docs, commit messages.

## Setup

```sh
pnpm install         # installs the lefthook hooks too
pnpm check:ci        # oxlint, tsc, eslint, prettier, vitest with coverage, jscpd, knip
```

The tests run without any certificate. `src/http/performRequest.test.ts` creates
a throwaway self-signed certificate with `openssl` at test time.

## Code shape

The lint configuration is the specification: read `eslint.config.ts` and the
files under `src/http` before writing. In short, one exported unit per file
named after it, types in their own files, functions under 50 lines, explicit
return types, `async` for anything returning a promise, and every portal quirk
documented in a comment next to the code that handles it.

A portal lives in `src/<portal>/`, split into a `session/` module (login, URLs,
the page-level parsers every feature needs) and one folder per feature
(`aeat/debts`, `aeat/payments`, `dehu/notifications`, `tgss/debt`, ...). Inside
a feature the orchestrator sits at the root and takes an `HttpClient`, and the
rest is placed by kind: `types/` (one type per file), `fetchers/` (the HTTP
calls, `fetch*`), `parsers/` (strings in, typed values out, `parse*`/`read*`),
`mappers/` (typed values in, typed values out), `selectors/` (`select*`) and
`validators/` (`is*`/`validate*`). The lint enforces the prefixed kinds and
forbids `utils/` and `helpers/`; the rest of the placement is convention, kept
because a reader should find a file from its name alone. Shared modules (`http`,
`html`, `certificate`, `cli`) follow the same split.

One file per CLI command under `src/cli/commands/`, registered in
`src/cli/commandRegistry.ts`; export the public pieces from `src/index.ts`.

## Commits and releases

Conventional commits (`feat:`, `fix:`, `docs:`, ...), enforced by commitlint on
commit. Releases bump `package.json`, update `CHANGELOG.md`, tag `vX.Y.Z` and
run the Publish workflow, which publishes through npm trusted publishing.
