import { readAttribute } from '../../html/readAttribute'

/** Pull the rotating ticket and the ProsaXMLData payload out of a Prosa page. */
export const readProsaPayload = (
  html: string,
): { readonly ticket: string; readonly xml: string } => {
  const ticketTag = /<[^>]*\bid="ARQ\.SPM\.TICKET"[^>]*>/.exec(html)?.[0]
  const ticket = ticketTag ? readAttribute(ticketTag, 'value') : undefined
  const xml = /<script id="xml"[^>]*>([\s\S]*?)<\/script>/
    .exec(html)?.[1]
    ?.trim()
  if (!ticket || !xml)
    throw new Error('TGSS: no Prosa ticket or XML payload in the response')
  return { ticket, xml }
}
