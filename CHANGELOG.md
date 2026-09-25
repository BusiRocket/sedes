# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed

- Bodies that read as text (JSON, HTML) are no longer fed to `inflateRawSync`,
  which accepted OARGT's pretty-printed JSON as a deflate stream and returned
  one garbage byte.

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
- `aeat informativas`: informative returns filed for one modelo and ejercicio
  (SCGI-DTRA, from 2020 on), with their CSV and the PDFs with `--out`.
- `aeat certificado-censal`: the "certificado de situacion censal" (EMCE-JDIT),
  emitted with the certificate's own identity and downloaded by CSV.
- `tgss deuda --tipo total`: the total debt report next to the detailed one.
- `tgss corriente`: the "certificado de estar al corriente" in its generic,
  tender, subsidy and article 42 variants (AECPSED1 options 1, 2, 3 and 5).
- `oargt recibos --importes`: today's amount per enforced receipt (principal,
  surcharge, interest, costs, total) through the portal's `CALCULAR_IMP` call.
- `tgss situacion`, `tgss nss`, `tgss datos`, `tgss alta`, `tgss empresario`:
  the affiliation reports INAF0013, INAF0007, INAF0008, INAF0009 and INAF0005.
- `tgss bases`: the "informe de bases y cuotas ingresadas" for one year
  (AESRCUS3), with the monthly rows per régimen next to the PDF.
- `sepe prestacion` and `sepe certificado`: the last unemployment benefit and
  the "certificado de situacion" at the SEPE, through its Cl@ve relay.
