import type { XadesMode } from '../types/XadesMode'

/** `--modo`, enveloped when absent. */
export const validateXadesMode = (value: string | undefined): XadesMode => {
  const mode = value ?? 'enveloped'
  if (mode !== 'enveloped' && mode !== 'enveloping' && mode !== 'detached')
    throw new Error('--modo must be enveloped, enveloping or detached')
  return mode
}
