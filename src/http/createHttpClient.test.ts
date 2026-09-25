import { describe, expect, it, vi } from 'vitest'

import { createHttpClient } from './createHttpClient'
import type { HttpResponse } from './HttpResponse'
import { performRequest } from './performRequest'

// The transport is stubbed here so the redirect and cookie logic is exercised
// alone; the real TLS exchange has its own test next to performRequest.
vi.mock('./performRequest', () => ({ performRequest: vi.fn() }))

const identity = { cert: Buffer.from('c'), key: Buffer.from('k') }

const redirect = (url: string, location: string): HttpResponse => ({
  status: 302,
  url,
  headers: { location },
  body: Buffer.alloc(0),
  text: '',
})

describe('createHttpClient', () => {
  it('follows redirects with a GET and returns the final response', async () => {
    const mocked = vi.mocked(performRequest)
    mocked.mockResolvedValueOnce(redirect('https://a.example/start', '/next'))
    mocked.mockResolvedValueOnce({
      status: 200,
      url: 'https://a.example/next',
      headers: {},
      body: Buffer.from('done'),
      text: 'done',
    })
    const client = createHttpClient(identity)
    const response = await client.request('https://a.example/start', {
      form: { a: '1' },
    })
    expect(response.text).toBe('done')
    expect(mocked).toHaveBeenCalledTimes(2)
    expect(mocked.mock.calls[1]?.[0]).toBe('https://a.example/next')
    expect(mocked.mock.calls[1]?.[3]).toMatchObject({ method: 'GET' })
  })

  it('stops at the redirect when asked not to follow, and gives up on loops', async () => {
    const loopUrl = 'https://a.example/loop'
    vi.mocked(performRequest).mockResolvedValue(redirect(loopUrl, '/loop'))
    const client = createHttpClient(identity)
    const stopped = await client.request(loopUrl, { followRedirects: false })
    expect(stopped.status).toBe(302)
    await expect(client.request(loopUrl)).rejects.toThrow('too many redirects')
    expect(client.cookie('a.example', 'none')).toBeUndefined()
  })
})
