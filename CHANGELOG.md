# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Certificate-bearing HTTPS client with cookie jar, redirect handling,
  ISO-8859-15 decoding and inflation of bodies compressed without a header.
- HTML form parsing and the Cl@ve auto-submit relay walker.
- CLI skeleton: `sedes <portal> <action> [--cert] [--key] [--out]`, JSON on
  stdout, usage on `--help`.
- `aeat deudas`: pending debts, their detail and deferral agreements at the
  Agencia Tributaria.
- `tgss deuda`: the "informe de deuda exigible" at the Seguridad Social.
- `dehu list`: pending and realized notifications at DEHU, without opening any.
- `oargt recibos`: receipts in voluntary and enforced collection at OARGT
  Caceres.
- `aeat pagos`: every payment made at the Agencia Tributaria (MisPagos) with its
  full NRC, and the receipt PDFs with `--out`.
- `aeat declaraciones`: declarations filed for one modelo and ejercicio
  (SCEJ-MANT), the CSV of each receipt, and the PDFs with `--out`.
- `tgss vida-laboral`: the "informe de vida laboral acotado" for a date range
  (INAF0011).
- `dehu documentos`: the document and voucher of notifications already realized,
  with retries on the portal's rate limit; no notification is opened.
- Every portal is laid out by feature and by kind of file (`types/`,
  `fetchers/`, `parsers/`, `mappers/`, `selectors/`, `validators/`).
