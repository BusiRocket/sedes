# papeleo

[Read in English](README.md)

Cliente de línea de comandos para las sedes electrónicas de la administración
española, con tu propio certificado digital. Un binario, una respuesta JSON por
sede: deudas, pagos, modelos presentados, notificaciones, informes de la
Seguridad Social, prestaciones del SEPE y el informe CIRBE, sin abrir el
navegador. Por defecto solo lee; también firma PDF y XML en local, y prepara o
ejecuta los trámites de "Escritura" solo cuando los confirmas. Lo mantiene
[InteliFactu](https://intelifactu.com), que lo usa para tener al día la parte de
la administración en la contabilidad de sus clientes.

| Comando                                                                                               | Sede                                          | Qué lee                                                                     |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| `papeleo aeat deudas --nif <NIF>`                                                                     | Agencia Tributaria (AEAT)                     | Deudas pendientes, su detalle y los aplazamientos                           |
| `papeleo aeat pagos --nif <NIF> [--out d]`                                                            | AEAT                                          | Todos los pagos hechos (Mis pagos) con su NRC y los justificantes en PDF    |
| `papeleo aeat declaraciones --nif <NIF> --modelo m --ejercicio a [--periodo p] [--out d]`             | AEAT                                          | Los modelos presentados de un ejercicio, el CSV de cada uno y los PDF       |
| `papeleo aeat informativas --nif <NIF> --modelo m --ejercicio a [--out d]`                            | AEAT                                          | Las declaraciones informativas (190, 347, 349...) desde 2020, con CSV y PDF |
| `papeleo aeat certificado-censal --nif <NIF> --nombre "<razón social>" [--out d]`                     | AEAT                                          | El certificado de situación censal (lo emite)                               |
| `papeleo tgss deuda --nif <NIF> [--tipo detallado\|total] [--out d]`                                  | Seguridad Social (TGSS)                       | El informe de deuda, detallado o total (lo emite)                           |
| `papeleo tgss corriente --nif <NIF> --tipo generico\|licitacion\|subvenciones\|articulo-42 [--out d]` | TGSS                                          | El certificado de estar al corriente (lo emite)                             |
| `papeleo tgss vida-laboral --desde DD/MM/AAAA [--hasta DD/MM/AAAA] [--out d]`                         | TGSS                                          | El informe de vida laboral acotado (lo emite)                               |
| `papeleo tgss situacion [--out d]`                                                                    | TGSS                                          | El informe de situación actual del trabajador (lo emite)                    |
| `papeleo tgss nss [--out d]`                                                                          | TGSS                                          | El informe del número de la Seguridad Social (lo emite)                     |
| `papeleo tgss datos [--out d]`                                                                        | TGSS                                          | El informe de datos identificativos y de domicilio (lo emite)               |
| `papeleo tgss alta --fecha DD/MM/AAAA [--out d]`                                                      | TGSS                                          | El informe de alta laboral a fecha concreta (lo emite)                      |
| `papeleo tgss empresario [--out d]`                                                                   | TGSS                                          | El informe negativo de inscripción como empresario (lo emite)               |
| `papeleo tgss bases [--ejercicio a] [--out d]`                                                        | TGSS                                          | Las bases y cuotas ingresadas de un año, mes a mes (lo emite)               |
| `papeleo dehu list [--state s] [--year a]`                                                            | Dirección Electrónica Habilitada única (DEHÚ) | Notificaciones pendientes y realizadas, sin abrir ninguna                   |
| `papeleo dehu documentos --out d [--year a] [--id a,b]`                                               | DEHÚ                                          | Documento y justificante de las notificaciones ya realizadas                |
| `papeleo oargt recibos [--include paid] [--importes hoy]`                                             | OARGT, Diputación de Cáceres                  | Recibos en voluntaria y en ejecutiva, con el importe a día de hoy           |
| `papeleo sepe prestacion`                                                                             | SEPE                                          | La última prestación: fechas, días de derecho, consumidos y restantes       |
| `papeleo sepe certificado --out d`                                                                    | SEPE                                          | El certificado de situación de prestaciones en PDF (lo emite)               |
| `papeleo cirbe informe --nacimiento DD-MM-AAAA --email e`                                             | Banco de España (CIRBE)                       | Pide tu informe de riesgos (lo emite)                                       |
| `papeleo cirbe estado [--out d]`                                                                      | CIRBE                                         | Lista tus peticiones y descarga los PDF listos                              |

## Escritura

Los comandos de escritura actúan ante la administración. Sin `--confirmar si`
solo hacen la preparación de lectura (sesión, listados, validación) e imprimen
el plan: cada petición que enviarían, con sus valores. Con `--confirmar si` la
ejecutan y devuelven el justificante. Se detienen antes del acto si algo no
cuadra con lo leído (titular, importe, documento).

| Comando                                                                                | Sede | Trámite                                                                            |
| -------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------- |
| `papeleo aeat comparecer --nif <NIF> --id <n> [--out d]`                               | AEAT | Comparece en una notificación de la sede de la AEAT; los plazos empiezan ese día   |
| `papeleo aeat carta-pago --nif <NIF> --clave K --importe n,nn [--out d]`               | AEAT | Genera una carta de pago parcial (modelo 010); pagarla es otro paso, en el banco   |
| `papeleo aeat domicilio --nif <NIF> --codigo-postal ... --via ... [...]`               | AEAT | Presenta el 036 de cambio de domicilio fiscal (personas jurídicas)                 |
| `papeleo tgss aplazamiento --nif <NIF> --plazos n --garantia exenta --documento f.pdf` | TGSS | Solicita un aplazamiento (XV207A01). De momento solo plan: falta capturar la firma |
| `papeleo tgss adjuntar --expediente n --documento f.pdf --tipo t`                      | TGSS | Adjunta un documento a un expediente. De momento solo plan, por lo mismo           |

## Firma

| Comando                                                                                                             | Qué hace                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `papeleo firmar pdf --in f.pdf --out g.pdf [--visible si] [--motivo texto]`                                         | Firma PAdES-B-B (ETSI.CAdES.detached) por actualización incremental; válida en Acrobat, pdfsig y openssl |
| `papeleo firmar xml --in f.xml --out g.xml [--modo enveloped\|enveloping\|detached] [--politica facturae\|ninguna]` | XAdES-BES/EPES con SHA-256 y la forma de AutoFirma; verificada con xmlsec1                               |

Las dos firman en tu máquina con el certificado y la clave que indiques.

## Utilidades sin certificado

| Comando                                                                    | Qué hace                                                                                              |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `papeleo validar nif --nif X`                                              | Valida un DNI, NIE, NIF especial o NIF de persona jurídica y dice de qué tipo es                      |
| `papeleo calendario fiscal --ejercicio 2026 [--modelo 303] [--periodo 3T]` | Plazos de presentación y de domiciliación tal como los publica la AEAT; un año no verificado da error |

Sin navegador, sin dependencias en tiempo de ejecución y sin guardar nada: la
herramienta habla HTTPS con tu certificado, recorre Cl@ve donde la sede lo pide,
interpreta la respuesta e imprime JSON. El certificado no sale de tu máquina.

## Instalación

```sh
npm install -g papeleo      # o: pnpm add -g papeleo, o npx papeleo ...
```

Node 22 o superior.

## El certificado

Sirven los certificados cualificados de la FNMT de persona física y de
representante de persona jurídica, y el DNIe. Exporta el tuyo a PEM una vez (el
.p12 de la FNMT necesita `-legacy` con OpenSSL 3):

```sh
openssl pkcs12 -legacy -in certificado.p12 -clcerts -nokeys -out cert.pem
openssl pkcs12 -legacy -in certificado.p12 -nocerts -nodes -out key.pem
chmod 600 key.pem
```

Y pásalo por argumentos o por variables de entorno:

```sh
papeleo aeat deudas --cert cert.pem --key key.pem --nif 12345678Z

export PAPELEO_CERT=cert.pem PAPELEO_KEY=key.pem
papeleo aeat deudas --nif 12345678Z
```

`PAPELEO_KEY_PASSPHRASE` desbloquea una clave cifrada. En una máquina compartida
usa las variables de entorno: los argumentos se ven en la lista de procesos.

## Lo que no hace

- Nunca comparece en una notificación de la DEHÚ: el intercambio de aceptación
  no está capturado y un acto jurídico a ciegas es peor que ninguno.
- Nunca paga, y nunca actúa sin `--confirmar si`.
- Nunca guarda datos de la sede, cookies ni tokens más allá del comando, y no
  envía nada a ningún sitio que no sea la sede que nombras.

Algunos comandos emiten un documento (informes y certificados de la TGSS,
certificado censal, certificado del SEPE, informe CIRBE). Emitirlo no cambia tu
situación, pero las sedes limitan cuántos puedes pedir al día: la TGSS rechaza a
partir de la tercera petición del mismo titular.

## Aviso legal

Usa `papeleo` solo con tu certificado, o con el de alguien que te haya
autorizado, sobre sus propios datos. Te obligan las condiciones de uso de cada
sede, no la herramienta. El proyecto no está afiliado a ninguna de las
administraciones con las que habla ni cuenta con su aval; sus páginas cambian
sin aviso y un parser puede romperse en cualquier momento. Comprueba en la
propia sede cualquier dato del que dependa algo importante.

## Licencia

MIT, ver `LICENSE`.
