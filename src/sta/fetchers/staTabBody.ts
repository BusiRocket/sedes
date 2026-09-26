import type { StaTab } from '../types/StaTab'

/** The urlencoded fields the page's own tab click sends to `submitAjax.aa`. */
export const staTabBody = (tab: StaTab): Readonly<Record<string, string>> => ({
  aaxmlrequest: 'true',
  eventScreenId: tab.screenId,
  eventComponent: '',
  eventObject: tab.tabber,
  eventAction: 'TABSEL',
  eventArguments: `SELECTED=${tab.tab}`,
  PAGE_CODE: tab.pageCode,
  APP_CODE: 'STA',
  PAGE_COMPLETE: '',
  ROOTID: '3',
  HFC: 'HEADER#FOOTER',
  SESSION_REQUIRED: 'false',
  [`tabs_${tab.tabber}`]: 'on',
})
