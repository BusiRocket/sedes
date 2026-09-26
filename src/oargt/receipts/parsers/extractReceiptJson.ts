import { findBalancedArrayEnd } from '../../../html/parsers/findBalancedArrayEnd'

/**
 * Pull the `dataset_DEUDAPENDIENTE` rows a RECIBOS tab embeds as a plain
 * JavaScript array literal inside a `<script>` block (plain in the initial
 * page, CDATA-wrapped in a `submitAjax.aa` XML answer; both are searched the
 * same way since CDATA content is literal text). A tab with no rows omits the
 * script entirely, which answers an empty array rather than an error.
 */
export const extractReceiptJson = (text: string): readonly unknown[] => {
  const marker = 'var dataset_DEUDAPENDIENTE = '
  const start = text.indexOf(marker)
  if (start === -1) return []
  const arrayStart = start + marker.length
  const arrayEnd = findBalancedArrayEnd(text, arrayStart)
  if (arrayEnd === -1) return []
  const parsed: unknown = JSON.parse(text.slice(arrayStart, arrayEnd + 1))
  return Array.isArray(parsed) ? parsed : []
}
