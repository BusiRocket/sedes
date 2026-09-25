/** The `onPresenvali` payload the 036 asks the client to echo back after "Aceptar envío". */
export const parsePresenvaliPayload = (
  text: string,
): Readonly<Record<string, unknown>> => {
  const raw = /'onPresenvali',\[(\{[^\]]*\})\]/.exec(text)?.[1]
  if (!raw)
    throw new Error(
      'AEAT: the 036 answered no onPresenvali payload; the presentation did not complete',
    )
  return JSON.parse(raw.replaceAll("'", '"')) as Readonly<
    Record<string, unknown>
  >
}
