# Security

## What this tool touches

`papeleo` authenticates to public-administration portals with the holder's own
qualified digital certificate and reads the holder's own data. The certificate
and its private key are the most sensitive material on the machine that runs it.
The tool:

- reads the certificate and key from the paths you give it, for the lifetime of
  one command, and never copies, caches or uploads them;
- keeps session cookies and bearer tokens in memory only;
- prints the portal's answer as JSON on stdout and, when you ask for it with
  `--out`, writes the documents the portal produced to the directory you name;
- stores nothing else, sends nothing anywhere except to the portal you asked
  for, and has no telemetry.

Keep the key file mode `0600`, prefer `PAPELEO_CERT` and `PAPELEO_KEY` over
command line arguments on shared machines (arguments are visible in the process
list), and never commit certificate material. The repository's `.gitignore`
refuses `*.pem`, `*.p12`, `*.pfx`, `*.key`, `*.crt` and `*.cer`; a `gitleaks`
pre-push hook scans every push.

## Reporting a vulnerability

Email `info@busirocket.com` with the details. Do not open a public issue for a
vulnerability that could expose a holder's data or credentials. You will get an
acknowledgement within a week; a fix or a mitigation is published before the
report is.

## Scope

In scope: anything that could leak certificate material, session state or portal
data to a third party; anything that turns a read-only command into an action
with legal effect at the portal; supply-chain issues in the published package or
the workflows.

Out of scope: the portals themselves. A defect in a public administration's
portal belongs to that administration.
