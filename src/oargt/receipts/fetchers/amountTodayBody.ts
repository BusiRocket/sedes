/**
 * The form fields the RECIBOS page's `calcularImp` handler posts to
 * `submitAjax.aa`: the page's hidden `webAppPageForm` inputs with the widget
 * id as screen, `CALCULAR_IMP` as action and the row's `dboid` as `KEY`, plus
 * the `noPageCall=true` the framework's `getAjaxData` appends.
 */
export const amountTodayBody = (
  rowKey: string,
): Readonly<Record<string, string>> => ({
  eventScreenId: 'DEUDAPENDIENTE',
  eventComponent: '',
  eventObject: '',
  eventAction: 'CALCULAR_IMP',
  eventArguments: `KEY=${rowKey}`,
  PAGE_CODE: 'RECIBOS',
  APP_CODE: 'STA',
  PAGE_COMPLETE: '',
  ROOTID: '3',
  HFC: 'HEADER_OARGTCaceres#FOOTER_OARGTCaceres',
  SESSION_REQUIRED: '',
  noPageCall: 'true',
})
