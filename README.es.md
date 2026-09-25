# sedes

[Read in English](README.md)

Cliente de línea de comandos, de solo lectura, para las sedes electrónicas de la
administración española, con tu propio certificado digital. Un binario, una
respuesta JSON por sede: deudas, pagos, modelos presentados, notificaciones,
informes de la Seguridad Social y prestaciones del SEPE, sin abrir el navegador.
Lo mantiene [InteliFactu](https://intelifactu.com), que lo usa para tener al día
la parte de la administración en la contabilidad de sus clientes.

| Comando                                                                                             | Sede                                          | Qué lee                                                                     |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| `sedes aeat deudas --nif <NIF>`                                                                     | Agencia Tributaria (AEAT)                     | Deudas pendientes, su detalle y los aplazamientos                           |
| `sedes aeat pagos --nif <NIF> [--out d]`                                                            | AEAT                                          | Todos los pagos hechos (Mis pagos) con su NRC y los justificantes en PDF    |
| `sedes aeat declaraciones --nif <NIF> --modelo m --ejercicio a [--periodo p] [--out d]`             | AEAT                                          | Los modelos presentados de un ejercicio, el CSV de cada uno y los PDF       |
| `sedes aeat informativas --nif <NIF> --modelo m --ejercicio a [--out d]`                            | AEAT                                          | Las declaraciones informativas (190, 347, 349...) desde 2020, con CSV y PDF |
| `sedes aeat certificado-censal --nif <NIF> --nombre "<razón social>" [--out d]`                     | AEAT                                          | El certificado de situación censal (lo emite)                               |
| `sedes tgss deuda --nif <NIF> [--tipo detallado\|total] [--out d]`                                  | Seguridad Social (TGSS)                       | El informe de deuda, detallado o total (lo emite)                           |
| `sedes tgss corriente --nif <NIF> --tipo generico\|licitacion\|subvenciones\|articulo-42 [--out d]` | TGSS                                          | El certificado de estar al corriente (lo emite)                             |
| `sedes tgss vida-laboral --desde DD/MM/AAAA [--hasta DD/MM/AAAA] [--out d]`                         | TGSS                                          | El informe de vida laboral acotado (lo emite)                               |
| `sedes tgss situacion [--out d]`                                                                    | TGSS                                          | El informe de situación actual del trabajador (lo emite)                    |
| `sedes tgss nss [--out d]`                                                                          | TGSS                                          | El informe del número de la Seguridad Social (lo emite)                     |
| `sedes tgss datos [--out d]`                                                                        | TGSS                                          | El informe de datos identificativos y de domicilio (lo emite)               |
| `sedes tgss alta --fecha DD/MM/AAAA [--out d]`                                                      | TGSS                                          | El informe de alta laboral a fecha concreta (lo emite)                      |
| `sedes tgss empresario [--out d]`                                                                   | TGSS                                          | El informe negativo de inscripción como empresario (lo emite)               |
| `sedes tgss bases [--ejercicio a] [--out d]`                                                        | TGSS                                          | Las bases y cuotas ingresadas de un año, mes a mes (lo emite)               |
| `sedes dehu list [--state s] [--year a]`                                                            | Dirección Electrónica Habilitada única (DEHÚ) | Notificaciones pendientes y realizadas, sin abrir ninguna                   |
| `sedes dehu documentos --out d [--year a] [--id a,b]`                                               | DEHÚ                                          | Documento y justificante de las notificaciones ya realizadas                |
| `sedes oargt recibos [--include paid] [--importes hoy]`                                             | OARGT, Diputación de Cáceres                  | Recibos en voluntaria y en ejecutiva, con el importe a día de hoy           |
| `sedes sepe prestacion`                                                                             | SEPE                                          | La última prestación: fechas, días de derecho, consumidos y restantes       |
| `sedes sepe certificado --out d`                                                                    | SEPE                                          | El certificado de situación de prestaciones en PDF (lo emite)               |

Sin navegador, sin dependencias en tiempo de ejecución y sin guardar nada: la
herramienta habla HTTPS con tu certificado, recorre Cl@ve donde la sede lo pide,
interpreta la respuesta e imprime JSON. El certificado no sale de tu máquina.

## Instalación

```sh
npm install -g sedes      # o: pnpm add -g sedes, o npx sedes ...
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
sedes aeat deudas --cert cert.pem --key key.pem --nif 12345678Z

export SEDES_CERT=cert.pem SEDES_KEY=key.pem
sedes aeat deudas --nif 12345678Z
```

`SEDES_KEY_PASSPHRASE` desbloquea una clave cifrada. En una máquina compartida
usa las variables de entorno: los argumentos se ven en la lista de procesos.

## Lo que no hace

Solo lee. Todo lo que tiene efecto jurídico está fuera a propósito:

- Nunca abre (comparece) una notificación de la DEHÚ. Abrirla inicia los plazos
  del acto que contiene; listarla no.
- Nunca presenta, firma, paga, confirma datos de contacto ni acepta nada.
- Nunca guarda datos de la sede, cookies ni tokens más allá del comando, y no
  envía nada a ningún sitio que no sea la sede que nombras.

Algunos comandos emiten un documento (informes y certificados de la TGSS,
certificado censal, certificado del SEPE). Emitirlo no cambia nada de tu
situación, pero las sedes limitan cuántos puedes pedir al día: la TGSS rechaza a
partir de la tercera petición del mismo titular.

## Aviso legal

Usa `sedes` solo con tu certificado, o con el de alguien que te haya autorizado,
sobre sus propios datos. Te obligan las condiciones de uso de cada sede, no la
herramienta. El proyecto no está afiliado a ninguna de las administraciones con
las que habla ni cuenta con su aval; sus páginas cambian sin aviso y un parser
puede romperse en cualquier momento. Comprueba en la propia sede cualquier dato
del que dependa algo importante.

## Licencia

MIT, ver `LICENSE`.
