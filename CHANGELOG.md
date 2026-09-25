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
