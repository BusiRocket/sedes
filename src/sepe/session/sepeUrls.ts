/**
 * The SEPE entry points. `ssoInit` starts the GetAccess SAML flow towards
 * Cl@ve for one service URL; the two services are the sede pages the package
 * reads once the relay lands on them.
 */
export const sepeUrls = {
  ssoInit: (serviceUrl: string): string =>
    `https://isweb.sepe.gob.es/GetAccess/Saml/SSO/Init?${new URLSearchParams({
      GA_SAML_AC_CLASS_REF: 'http://eidas.europa.eu/LoA/low',
      GAURI: serviceUrl,
      GA_SAML_IDP: 'https://pasarela.clave.gob.es/Proxy2',
      GA_SAML_IS_PASSIVE: 'false',
      GA_SAML_PROVIDER: 'Q2819009H_E00142804',
      GA_SAML_AC_COMPARISON: 'minimum',
    }).toString()}`,
  sepeOrigin: 'https://isweb.sepe.gob.es',
  claveOrigin: 'https://pasarela.clave.gob.es',
  sedeOrigin: 'https://sede.sepe.gob.es',
  certificateIdp: 'AFIRMA',
  lastBenefit:
    'https://sede.sepe.gob.es/ConsultaPrestacionesAAWWeb/AccesoConsultaAction.do',
  certificates:
    'https://sede.sepe.gob.es/DServiciosPrestanetWEB/CertificadosPrestaWeb.do',
} as const
