/** Every `--name value` option the command line carried, by name. */
export type CliOptions = Readonly<Record<string, string | undefined>>
