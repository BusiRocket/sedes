import type { HttpClient } from '../http/types/HttpClient'

/** The client handed to offline commands: any attempt to reach a portal is a programming error. */
export const offlineHttpClient: HttpClient = {
  request: async (url) => {
    await Promise.resolve()
    throw new Error(`offline command tried to reach ${url}`)
  },
  cookie: () => undefined,
}
