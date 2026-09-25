/** The fixed TGSS/ProsaInternet URLs the "informe de deuda exigible" flow needs. */
export const tgssUrls = {
  loginEntry:
    'https://sp.seg-social.es/ProsaInternet/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=AECPSED1&PAUC.NIVEL=1&PAUC.TIPO_IDENTIFICACION=0',
  certificateSelection: 'https://idp.seg-social.es/PGIS/Login?seleccion=IPCE',
  postForm: (sessionId: string): string =>
    `https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=${sessionId}`,
  viewDoc: (sessionId: string): string =>
    `https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=${sessionId}?SECUENCIAL=1&TYPEVIEW=DOCUMENTO`,
} as const
