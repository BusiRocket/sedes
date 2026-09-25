import type { ReceiptTab } from '../types/ReceiptTab'

/**
 * The form fields a `submitAjax.aa` TABSEL POST needs to switch the RECIBOS
 * page's TABBER to the ejecutiva or pagados tab. Encoded through
 * `HttpClient`'s `form` option, this reproduces the exact urlencoded body the
 * portal's own tab clicks send.
 */
export const tabSelectionBody = (
  tab: Exclude<ReceiptTab, 'voluntaria'>,
): Readonly<Record<string, string>> => {
  const selected = tab === 'ejecutiva' ? 'PENDIENTES_EJECUTIVA' : 'PAGADOS'
  return {
    aaxmlrequest: 'true',
    eventScreenId: 'DEUDAPENDIENTE',
    eventComponent: '',
    eventObject: 'TABBER',
    eventAction: 'TABSEL',
    eventArguments: `SELECTED=${selected}`,
    PAGE_CODE: 'RECIBOS',
    APP_CODE: 'STA',
    PAGE_COMPLETE: '',
    ROOTID: '3',
    HFC: 'HEADER_OARGTCaceres#FOOTER_OARGTCaceres',
    SESSION_REQUIRED: 'false',
    tabs_TABBER: 'on',
  }
}
