import { describe, expect, it, vi } from 'vitest'

import { listNotifications } from '../../dehu/listNotifications'
import type { HttpClient } from '../../http/HttpClient'
import { dehuList } from './dehuList'

vi.mock('../../dehu/listNotifications')

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

describe('dehuList', () => {
  it('describes itself as a listing-only command', () => {
    expect(dehuList.portal).toBe('dehu')
    expect(dehuList.action).toBe('list')
    expect(dehuList.options).toEqual(['state', 'year'])
    expect(dehuList.description).toContain('without opening any')
  })

  it('defaults to state=pending with no year', async () => {
    vi.mocked(listNotifications).mockResolvedValue({
      state: 'pending',
      notifications: [],
      count: 0,
      pages: 0,
    })
    await dehuList.run(client, {})
    expect(listNotifications).toHaveBeenCalledWith(client, {
      state: 'pending',
      year: new Date().getFullYear(),
    })
  })

  it('forwards a parsed numeric year for state=realized', async () => {
    vi.mocked(listNotifications).mockResolvedValue({
      state: 'realized',
      notifications: [],
      count: 0,
      pages: 0,
    })
    await dehuList.run(client, { state: 'realized', year: '2026' })
    expect(listNotifications).toHaveBeenCalledWith(client, {
      state: 'realized',
      year: 2026,
    })
  })

  it('rejects an unknown state', async () => {
    await expect(dehuList.run(client, { state: 'bogus' })).rejects.toThrow(
      '--state must be one of pending, realized, all',
    )
  })

  it('defaults --year to the current year for realized and all', async () => {
    await dehuList.run(client, { state: 'realized' })
    expect(listNotifications).toHaveBeenLastCalledWith(client, {
      state: 'realized',
      year: new Date().getFullYear(),
    })
  })

  it('rejects a non-integer year', async () => {
    await expect(
      dehuList.run(client, { state: 'realized', year: 'soon' }),
    ).rejects.toThrow('--year must be a whole year number')
  })
})
