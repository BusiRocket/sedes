import type { FormFieldPair } from '../types/FormFieldPair'

/** The `fAccion=2` body: validate a certificate request for the holder itself. */
export const validationFields = (islw: string): readonly FormFieldPair[] => [
  ['fTipoRepresentacion', '1'],
  ['fNifT', ''],
  ['fNombreT', ''],
  ['fTipoModelo', 'C'],
  ['fAccion', '2'],
  ['fIslw', islw],
  ['validarSolicitud', 'Validar solicitud'],
]
