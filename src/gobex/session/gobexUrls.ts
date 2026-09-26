/** The Junta de Extremadura's Carpeta Ciudadana (`sede.gobex.es`) entry points. */
export const gobexUrls = {
  claveAccess:
    'https://sede.gobex.es/SEDE/estructura/accesoClave.jsf?opcion=24',
  origin: 'https://sede.gobex.es',
  claveOrigin: 'https://pasarela.clave.gob.es',
  certificateIdp: 'AFIRMA',
  debts:
    'https://sede.gobex.es/SEDE/privado/ciudadanos/servicioPagos/consultaDeudas.jsf',
  paidFees:
    'https://sede.gobex.es/SEDE/privado/ciudadanos/servicioPagos/consultaTasasIngresadas.jsf',
  feeIncidents:
    'https://sede.gobex.es/SEDE/privado/ciudadanos/servicioPagos/consultaTasasPendientes.jsf',
  payments: 'https://sede.gobex.es/SEDE/privado/ciudadanos/MisPagos.jsf',
  expedientes:
    'https://sede.gobex.es/SEDE/privado/ciudadanos/MisExpedientes.jsf',
  notifications:
    'https://sede.gobex.es/SEDE/privado/ciudadanos/Notificaciones.jsf',
  documents: 'https://sede.gobex.es/SEDE/privado/ciudadanos/MisDocumentos.jsf',
  representedExpedientes:
    'https://sede.gobex.es/SEDE/privado/ciudadanos/ExpRepresentados.jsf',
  paymentCompanies: ['AG00', 'OA01', 'OA02', 'EP01', 'OE01'],
} as const
