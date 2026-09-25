/** Per-request options; everything is optional and defaults to a plain GET that follows redirects. */
export type HttpRequestOptions = {
  readonly method?: 'GET' | 'POST' | undefined
  /** A form body (`application/x-www-form-urlencoded`) or a raw string. */
  readonly form?: Readonly<Record<string, string>> | undefined
  readonly body?: string | undefined
  readonly headers?: Readonly<Record<string, string>> | undefined
  readonly referer?: string | undefined
  /** Follow 3xx answers; on by default. The SAML relays need it off to read each hop. */
  readonly followRedirects?: boolean | undefined
  /** Decode the body with this charset when the response declares none. */
  readonly defaultCharset?: string | undefined
  readonly timeoutMs?: number | undefined
}
