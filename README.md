# sedes

Read-only command-line client for Spanish public-administration portals, using
the holder's own digital certificate. One binary, one JSON answer per portal:

| Command                                                                                             | Portal                                          | What it reads                                                                                           |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `sedes aeat deudas --nif <NIF>`                                                                     | Agencia Tributaria (AEAT)                       | Pending debts, their detail, deferral agreements                                                        |
| `sedes aeat pagos --nif <NIF> [--out d]`                                                            | AEAT                                            | Every payment made (MisPagos) with its NRC, and the receipt PDFs                                        |
| `sedes aeat declaraciones --nif <NIF> --modelo m --ejercicio y [--periodo p] [--out d]`             | AEAT                                            | Declarations filed for one modelo and year, the CSV of each receipt, the PDFs                           |
| `sedes aeat informativas --nif <NIF> --modelo m --ejercicio y [--out d]`                            | AEAT                                            | Informative returns filed (190, 347, 349...) from 2020 on, with their CSV and PDFs                      |
| `sedes aeat certificado-censal --nif <NIF> --nombre "<name>" [--out d]`                             | AEAT                                            | The "certificado de situacion censal" (emits it; the same day answers the cached CSV)                   |
| `sedes tgss deuda --nif <NIF> [--tipo detallado\|total] [--out d]`                                  | Tesorería General de la Seguridad Social (TGSS) | The "informe de deuda" detailed or total (emits it; counts against the daily cap)                       |
| `sedes tgss corriente --nif <NIF> --tipo generico\|licitacion\|subvenciones\|articulo-42 [--out d]` | TGSS                                            | A "certificado de estar al corriente" (emits it; counts against the daily cap)                          |
| `sedes tgss vida-laboral --desde DD/MM/AAAA [--hasta DD/MM/AAAA] [--out d]`                         | TGSS                                            | The "informe de vida laboral acotado" for a date range (emits it)                                       |
| `sedes tgss situacion [--out d]`                                                                    | TGSS                                            | The "informe de situación actual del trabajador" (emits it)                                             |
| `sedes tgss nss [--out d]`                                                                          | TGSS                                            | The "informe del número de la Seguridad Social" (emits it)                                              |
| `sedes tgss datos [--out d]`                                                                        | TGSS                                            | The "informe de datos identificativos y de domicilio" (emits it)                                        |
| `sedes tgss alta --fecha DD/MM/AAAA [--out d]`                                                      | TGSS                                            | The "informe de alta laboral a fecha concreta" (emits it)                                               |
| `sedes tgss empresario [--out d]`                                                                   | TGSS                                            | The "informe negativo de inscripción de empresario" (emits it)                                          |
| `sedes tgss bases [--ejercicio y] [--out d]`                                                        | TGSS                                            | The "informe de bases y cuotas ingresadas" for one year, with the monthly rows per régimen (emits it)   |
| `sedes dehu list [--state s] [--year y]`                                                            | Dirección Electrónica Habilitada única (DEHU)   | Pending and realized notifications, without opening any                                                 |
| `sedes dehu documentos --out d [--year y] [--id a,b]`                                               | DEHU                                            | The document and voucher of notifications already realized (none is opened)                             |
| `sedes oargt recibos [--include paid] [--importes hoy]`                                             | OARGT, Diputación de Cáceres                    | Receipts in voluntary and enforced collection, with today's amount per enforced receipt on `--importes` |
| `sedes sepe prestacion`                                                                             | Servicio Público de Empleo Estatal (SEPE)       | The last unemployment benefit: dates, days of right, consumed and remaining                             |
| `sedes sepe certificado --out d`                                                                    | SEPE                                            | The "certificado de situacion" of benefits as PDF (emits it)                                            |

No browser, no runtime dependencies, nothing stored: the tool speaks HTTPS with
the certificate, walks the Cl@ve relay where the portal needs it, parses the
answer and prints JSON.

## Install

```sh
npm install -g sedes      # or: pnpm add -g sedes, or npx sedes ...
```

Node 22 or newer.

## The certificate

The portals accept the qualified certificates FNMT issues to people and to legal
entities, and the DNIe. Export yours once to PEM (a PKCS#12 bundle from FNMT
needs `-legacy` on OpenSSL 3):

```sh
openssl pkcs12 -legacy -in certificate.p12 -clcerts -nokeys -out cert.pem
openssl pkcs12 -legacy -in certificate.p12 -nocerts -nodes -out key.pem
chmod 600 key.pem
```

Then either pass the paths or export them:

```sh
sedes aeat deudas --cert cert.pem --key key.pem --nif 12345678Z

export SEDES_CERT=cert.pem SEDES_KEY=key.pem
sedes aeat deudas --nif 12345678Z
```

`SEDES_KEY_PASSPHRASE` unlocks an encrypted key. Prefer the environment
variables on a shared machine: command-line arguments show up in the process
list.

## Output

Every command prints one JSON document on stdout and exits 0. Errors go to
stderr as `sedes: <message>` with exit code 1; an unknown command or option
prints the usage and exits 2. Amounts keep the portal's own text (`"1.234,56"`)
next to a parsed number in euros, so nothing is lost in rounding and nothing has
to be re-parsed downstream.

```sh
sedes aeat deudas --nif 12345678Z | jq '.debts[] | {clave, estado, pendiente}'
```

## Library

The same code is importable. The client takes the certificate once and every
portal function takes the client:

```ts
import { createHttpClient, loadCertificateIdentity } from 'sedes'

const identity = await loadCertificateIdentity({
  cert: 'cert.pem',
  key: 'key.pem',
})
const client = createHttpClient(identity)
```

The portal orchestrators and their result types are exported from the package
root as well; see `src/index.ts`.

## What it will not do

The tool reads. Every action with legal effect is left out on purpose, not
merely unimplemented:

- It never opens (comparece) a DEHU notification. Opening one starts the legal
  clock of the act it carries; listing does not.
- It never files, signs, pays, confirms contact data or accepts anything at any
  portal.
- It never stores portal data, session cookies or tokens beyond the running
  command, and it sends nothing anywhere but to the portal you named.

The one nuance is TGSS: the debt report is a document the portal emits on
request and limits to one per subject and day. Emitting it changes nothing about
the holder's position; it is still a read.

## Legal notice

Use `sedes` only with your own certificate, or with one whose holder has
authorised you to act on their behalf, on the holder's own data. The portals'
terms of use bind you, not the tool. The package is not affiliated with, nor
endorsed by, any of the administrations it talks to; their pages change without
notice and a parser can break at any time. Read the JSON with that in mind and
check anything that matters against the portal itself.

## Contributing

See `CONTRIBUTING.md`. The lint configuration is the coding standard; the
fixtures are synthetic by rule; every command stays read-only unless its name
says otherwise.

## License

MIT, see `LICENSE`.
