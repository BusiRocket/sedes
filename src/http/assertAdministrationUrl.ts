import { isAdministrationHost } from './isAdministrationHost'

/**
 * Refuse any URL whose host is not one of the administrations. Every request
 * presents the holder's certificate on its handshake, and SAML relays take
 * their next URL from a form in the previous response, so the check belongs
 * on every hop, not only on redirects.
 */
export const assertAdministrationUrl = (url: string): void => {
  const host = new URL(url).hostname
  if (!isAdministrationHost(host))
    throw new Error(`refused request to ${host}: not an administration host`)
}
