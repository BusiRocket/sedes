/** One synthetic ZK widget declaration as `index.zul` and zkau answers print it. */
export const zkWidget = (uuid: string, id: string): string =>
  `['zul.wgt.Textbox','${uuid}',{id:'${id}'}],`
