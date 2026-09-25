/** One `name=value` of a form body, kept as a pair because order matters to AEAT. */
export type FormFieldPair = readonly [name: string, value: string]
