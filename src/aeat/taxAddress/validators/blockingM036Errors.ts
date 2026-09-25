import { parseM036Errors } from '../parsers/parseM036Errors'

/** The errors of a 036 answer that stop the declaration: every code but `00000`, as one message. */
export const blockingM036Errors = (text: string): string | undefined => {
  const errors = parseM036Errors(text).filter((error) => error.code !== '00000')
  return errors.length === 0
    ? undefined
    : errors.map((error) => `${error.code} ${error.message}`).join('; ')
}
