/**
 * The Banco de España CIRBE Oficina Virtual entry points. `login` starts the
 * IAEC SAML flow towards Cl@ve; the app paths are the Spring WebFlow flows the
 * package drives once the relay lands on the app.
 */
export const cirbeUrls = {
  base: 'https://aps.bde.es',
  origin: 'https://aps.bde.es',
  appReferer: 'https://aps.bde.es/cir_www/',
  claveOrigin: 'https://pasarela.clave.gob.es',
  certificateIdp: 'AFIRMA',
  login: 'https://aps.bde.es/iaec/2login?url=/cir_www/&PolicyId=3',
  home: 'https://aps.bde.es/cir_www/InicioXml',
  requestFlow: 'https://aps.bde.es/cir_www/PeticionInformeRiesgo',
  requestScreen:
    'https://aps.bde.es/cir_www/PeticionInformeRiesgo/PeticionInformeRiesgo/PeticionInformeRiesgo',
  requestsList: 'https://aps.bde.es/cir_www/ConsultaSolicitudesRiesgos',
  downloadStart:
    'https://aps.bde.es/cir_www/ConsultaSolicitudesRiesgos/ConsultaSolicitudesRiesgos/ConsultaEstadoRiesgos/Descargar',
  downloadSelect:
    'https://aps.bde.es/cir_www/ConsultaSolicitudesRiesgos/DescargaSolicitudesRiesgos/DescargarSolicitudesRiesgos/Descargar',
  downloadRelease:
    'https://aps.bde.es/cir_www/ConsultaSolicitudesRiesgos/DescargaSolicitudesRiesgos/mostrarFichero/muestraFicheroIAS',
  file: (name: string): string =>
    `https://aps.bde.es/cir_www/gestiondeficheros/${encodeURIComponent(name)}`,
} as const
