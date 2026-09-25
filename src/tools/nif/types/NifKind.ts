/**
 * The families of Spanish tax identifiers (Real Decreto 1065/2007, arts. 18-21;
 * Orden EHA/451/2008):
 * - `dni`: Spanish national, 8 digits and a control letter.
 * - `nie`: foreign national, X/Y/Z, 7 digits and a control letter.
 * - `nif-especial`: K (under 14), L (Spanish non-resident), M (foreigner without NIE).
 * - `persona-juridica`: entities, a type letter, 7 digits and a control digit or letter.
 * - `desconocido`: nothing above matches the shape.
 */
export type NifKind =
  'dni' | 'nie' | 'nif-especial' | 'persona-juridica' | 'desconocido'
