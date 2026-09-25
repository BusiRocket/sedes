import { derNode } from './derNode'

/** DER UTCTime (`YYMMDDHHMMSSZ`) for dates before 2050. */
export const derUtcTime = (date: Date): Buffer => {
  const text = date.toISOString().replaceAll(/[-:T]/g, '').slice(2, 14)
  return derNode(0x17, Buffer.from(`${text}Z`, 'ascii'))
}
