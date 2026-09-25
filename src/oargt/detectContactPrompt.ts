/**
 * True when the certificate landed on the contact-data confirmation gate
 * (`DATOS_PERSONALES`) instead of the RECIBOS page. Confirming that prompt is
 * a write, so the sweep only reports it and never submits it.
 */
export const detectContactPrompt = (html: string): boolean =>
  html.includes('Proceda a Validar los datos referentes a Medios de Contacto')
