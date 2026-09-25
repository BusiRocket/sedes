import type { HttpClient } from '../../../http/types/HttpClient'
import { aeatBaseUrl } from '../../session/aeatBaseUrl'

/**
 * A fresh SCEJ-MANT search page. Every search needs its own: a reused ZK
 * desktop replays the previous query's grid. The page sometimes answers
 * without the ZK mount, so one retry is built in.
 */
export const fetchSearchPage = async (client: HttpClient): Promise<string> => {
  const url = `${aeatBaseUrl}/wlpl/SCEJ-MANT/CONSUL/index.zul`
  const attempts = 2
  let text = ''
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const response = await client.request(url)
    text = response.text
    if (text.includes("dt:'")) return text
  }
  return text
}
