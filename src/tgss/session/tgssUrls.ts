/**
 * The Prosa front-end of the Seguridad Social. `loginEntry` takes the service
 * code (`AECPSED1` is the debt report, `INAF0011` the vida laboral); the app
 * session travels in the URL path (`;jsessionid=`), not in a cookie header.
 */
export const tgssUrls = {
  loginEntry: (app: string): string =>
    `https://sp.seg-social.es/ProsaInternet/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=${app}&PAUC.NIVEL=1&PAUC.TIPO_IDENTIFICACION=0`,
  certificateSelection: 'https://idp.seg-social.es/PGIS/Login?seleccion=IPCE',
  postForm: (sessionId: string): string =>
    `https://sp.seg-social.es/ProsaInternet/OnlineAccessUtf8;jsessionid=${sessionId}`,
  viewDoc: (
    sessionId: string,
    secuencial = '1',
    typeView: 'DOCUMENTO' | 'INFORME' = 'DOCUMENTO',
  ): string =>
    `https://sp.seg-social.es/ProsaInternet/ViewDocUtf8;jsessionid=${sessionId}?SECUENCIAL=${secuencial}&TYPEVIEW=${typeView}`,
} as const
