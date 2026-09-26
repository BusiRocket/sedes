# TODO

> Consolidated from the accessible Claude project history. Last reviewed:
> 2026-09-26. History coverage: Partial. The session that built the write layer
> is still open, so its record stays partial; no Codex, Cursor or Antigravity
> history touched this repository.
>
> States: `[ ]` pending · `[~]` partial or unverified · `[!]` blocked · `[x]`
> verified complete · `[-]` obsolete or superseded. Closed work moves to
> `TODO_LOG.md`.

## Security

- [ ] **Three commits never got a completed security review.** The automated
      reviews of `5f03b02` (first adapters) and `f26f614` (second read wave)
      stopped without a verdict, and the write wave `308dea4` was never
      reviewed. Run one review over each, read-only, and file what it finds
      here.

## Blocked Tasks

- [!] **DEHU comparecencia.** Not implemented on purpose: the re-auth hop
  `.../aceptar/{ref}/login?authData=` and the accept call were never captured,
  and appearing is a legal act. Unblock: the owner records a browser HAR of one
  accept they choose to make, and authorises that specific notification.
- [!] **TGSS `aplazamiento` and `adjuntar` refuse `--confirmar si`.** The "firma
  optimizada" is implemented and tested, but there is no capture of the
  FIRMA_FILTROS/PREPARARXML/COMPONERXML_AUTOFIRMA exchange, the `SPM.ACC.FIRMAR`
  body or the CEUS upload. Unblock: HAR captures of one deferral walked through
  signing and one attachment, then one authorised live run each.

## Testing

- [~] **AEAT `comparecer`, `carta-pago` and `domicilio`** ran live only in plan
  mode; the pages after the signature are inferred from the wiki flows and fail
  safe. Done when each has one owner-authorised live run and its receipt parsed.
- [~] **`cirbe estado` download of a ready report.** The 2026-09-26 request was
  still "Registrada" at 03:18 and again at 12:20, two hours and nineteen minutes
  after it was made, across eight polls; the 14-minute-to-2-hour figure may hold
  only in office hours. Re-run `cirbe estado --out` during the day before
  suspecting the status parser. Done when a resolved request writes its PDF
  under `--out`.
- [ ] **TGSS debt report PDF path with a real debt.** Unexercised through the
      package because every indebted holder had used the day's emission. Run
      `tgss deuda --out` on a day one has not.

## Integrations

- [ ] **Dated AECPSED1 certificates (types 4, 8, 9)** are refused until the date
      field of the request is captured.
- [ ] **OARGT `LISTALIQ`** (liquidations) is server-rendered with a write button
      and was not ported.
- [ ] **Junta de Extremadura and Ayuntamiento de Cáceres** have only Playwright
      evidence; capture them at HTTP level before a port.

## Documentation

- [ ] **Launch after `v0.1.0`:** the Spanish LinkedIn post (draft delivered to
      the owner, update it to the final name) and a listing PR to
      `awesome-spain`.

## Future Ideas

- [ ] FACe invoice submission, which needs XAdES byte-compatible with AutoFirma.
- [ ] RED SARA REC general registry filing and the Junta STA registry.
- [ ] BOE fixed-width modelo writer and validator.
