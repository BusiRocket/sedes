/** Fields every Prosa POST carries; the ticket rotates per request. */
export const prosaCommonFields = (ticket: string): Record<string, string> => ({
  'SPM.CONTEXT': 'internet',
  'ARQ.SPM.OUT': 'XML_STYLESHEET',
  ES_FW4: '1',
  'ARQ.SPM.IDIOMA': 'ES',
  'SPM.HAYJS': '1',
  'ARQ.SPM.TICKET': ticket,
  'SPM.ISPOPUP': '0',
})
