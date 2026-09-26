# TODO Log

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-09

- [x] 2026-09-25 — **Backend:** Certificate HTTP client, Cl@ve relay and CLI
      skeleton, then the AEAT, TGSS, DEHU and OARGT debt reads.
  - Result: `sedes <portal> <action>` with JSON on stdout, zero runtime
    dependencies, verified live on every holder the same day.
  - Evidence: commits `867495e`, `5f03b02`, fixes from the live run in
    `4043a2e`.

- [x] 2026-09-25 — **Refactors:** Layout by portal, feature and kind.
  - Result: 179 files moved, API and CLI unchanged.
  - Evidence: commit `9ebb1a4`, `pnpm check:ci` green.

- [x] 2026-09-25 — **Backend:** Read waves: AEAT pagos, declaraciones,
      informativas and certificado censal; DEHU documents; TGSS vida laboral,
      affiliation reports, bases and certificates; SEPE; OARGT amounts.
  - Result: each verified live once on the holder's certificate.
  - Evidence: commits `ee586c9`, `f26f614`.

- [x] 2026-09-25 — **Infrastructure:** Repository moved from BusiRocket to
      `InteliFactu/sedes`, Spanish README added.
  - Evidence: commit `b4412e1`; GitHub redirects the old URL.

- [x] 2026-09-26 — **Backend:** Write layer with plan mode, local PAdES and
      XAdES signing, CIRBE, offline NIF validation and fiscal calendar.
  - Result: 30 commands; writes act only with `--confirmar si`; no live act
    executed.
  - Evidence: commit `308dea4`, `pnpm check:ci` 457 files and 1010 tests
    passing; signatures verified with openssl, pdfsig, qpdf and xmlsec1.

- [-] 2026-09-26 — **Pending Decisions:** Rename to `papeleo`.
  - Resolution: applied without the owner's approval in `9baee9b`, reverted in
    `a1fb987` with the GitHub repository renamed back. The name stays open in
    `TODO.md`.

- [x] 2026-09-26 — **Pending Decisions:** Final name chosen by the owner:
      `ventanilla-unica`.
  - Result: package, binary, environment variables and GitHub repository
    renamed; nothing had been published as `sedes`.
  - Evidence: rename commit on `main`, `pnpm check:ci` green.

- [x] 2026-09-26 — **Refactors:** Local checkout moved from `~/p/sedes` to
      `~/p/ventanilla-unica`; the wiki page is now
      `projects/ventanilla-unica.md`.
  - Evidence: wiki `794125f1`, `~/p` `c472fa7`; `brain graph` reports 0 dangling
    links.

- [x] 2026-09-26 — **Security:** HTTP client and DEHU writer hardening before
      the first release.
  - Result: cookies scoped to a public suffix or a foreign domain are dropped;
    redirects to another host outside the administrations are refused; responses
    and undeclared decompression are capped at 64 MiB; DEHU file names are
    sanitised and writes outside `--out` are refused.
  - Evidence: `pnpm check:ci` 461 files and 1023 tests passing; live
    `cirbe estado` and `dehu list` through the new redirect check.

- [x] 2026-09-26 — **Infrastructure:** First releases on npm.
  - Result: `0.1.0` published by the owner from a clean clone of the tag;
    trusted publisher created with `npm trust github` for
    `InteliFactu/ventanilla-unica` and `publish.yml`; `0.1.1` (bin path without
    `./`) published by the workflow with provenance.
  - Evidence: tags `v0.1.0`, `v0.1.1`; Actions run 36235925200;
    `npm audit signatures` reports a verified signature and attestation.
