import { unescapeZkDesktopId } from '../../filings/mappers/unescapeZkDesktopId'

/** The ZK desktop id of a fresh 036 `index.zul`. */
export const parseM036DesktopId = (html: string): string => {
  const raw = /dt:'(z_[^']+)'/.exec(html)?.[1]
  if (!raw) throw new Error('AEAT: no ZK desktop id in the 036 index.zul')
  return unescapeZkDesktopId(raw)
}
