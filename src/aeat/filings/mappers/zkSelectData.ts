/** The `data_0` payload of a ZK `onSelect` event on one combo item. */
export const zkSelectData = (
  itemUuid: string,
): Readonly<Record<string, unknown>> => ({
  items: [itemUuid],
  reference: itemUuid,
})
