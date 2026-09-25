import type { HttpResponse } from '../http/HttpResponse'

/** Parse a DEHU response as JSON, or fail with its status and a context label instead of a cryptic syntax error. */
export const parseJsonResponse = (
  response: HttpResponse,
  context: string,
): unknown => {
  try {
    return JSON.parse(response.text)
  } catch {
    throw new Error(
      `DEHU: ${context} did not return JSON (status ${String(response.status)})`,
    )
  }
}
