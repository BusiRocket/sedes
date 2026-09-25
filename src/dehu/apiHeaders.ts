/** Headers every DEHU notifications API call needs: the bearer JWT and a JSON answer. */
export const apiHeaders = (
  authData: string,
): Readonly<Record<string, string>> => ({
  Authorization: `Bearer ${authData}`,
  Accept: 'application/json',
})
