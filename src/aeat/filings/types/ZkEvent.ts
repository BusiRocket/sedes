/** One ZK client event: the command, the target widget and its `data_0` payload. */
export type ZkEvent = {
  readonly cmd: 'onSelect' | 'onClick'
  readonly uuid: string
  readonly data: Readonly<Record<string, unknown>>
}
