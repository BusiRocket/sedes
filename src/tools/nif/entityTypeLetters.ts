/**
 * The first letter of an entity NIF and the kind of control character it takes
 * (Orden EHA/451/2008, arts. 2-3): a letter for N, P, Q, R, S and W, a digit for
 * A, B, E and H, and either for the rest.
 */
export const entityTypeLetters: Readonly<
  Record<string, 'letra' | 'digito' | 'cualquiera'>
> = {
  A: 'digito',
  B: 'digito',
  C: 'cualquiera',
  D: 'cualquiera',
  E: 'digito',
  F: 'cualquiera',
  G: 'cualquiera',
  H: 'digito',
  J: 'cualquiera',
  N: 'letra',
  P: 'letra',
  Q: 'letra',
  R: 'letra',
  S: 'letra',
  U: 'cualquiera',
  V: 'cualquiera',
  W: 'letra',
}
