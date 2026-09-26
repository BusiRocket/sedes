import type { StaRow } from './StaRow'

/** Every `ds_<NAME>` dataset a page or tab answer embeds, keyed by `<NAME>`. */
export type StaDatasets = Readonly<Record<string, readonly StaRow[]>>
