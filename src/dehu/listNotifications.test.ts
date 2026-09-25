import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { HttpClient } from '../http/HttpClient'
import { fetchPendingNotifications } from './fetchPendingNotifications'
import { fetchRealizedNotifications } from './fetchRealizedNotifications'
import { listNotifications } from './listNotifications'
import { loginWithCertificate } from './loginWithCertificate'
import type { Notification } from './Notification'

vi.mock('./loginWithCertificate')
vi.mock('./fetchPendingNotifications')
vi.mock('./fetchRealizedNotifications')

const pendingNotification: Notification = {
  id: 'P1',
  subject: 'Pending',
  issuer: 'AEAT',
  createdAt: '2026-01-01',
  state: 'pending',
}

const realizedNotification: Notification = {
  id: 'R1',
  subject: 'Realized',
  issuer: 'AEAT',
  createdAt: '2026-02-01',
  state: 'compareced',
}

const client: HttpClient = { request: vi.fn(), cookie: () => undefined }

beforeEach(() => {
  vi.mocked(loginWithCertificate).mockResolvedValue('TOKEN')
  vi.mocked(fetchPendingNotifications).mockResolvedValue({
    notifications: [pendingNotification],
    pages: 1,
  })
  vi.mocked(fetchRealizedNotifications).mockResolvedValue({
    notifications: [realizedNotification],
    pages: 3,
  })
})

describe('listNotifications', () => {
  it('reads only pending notifications by default', async () => {
    const result = await listNotifications(client, { state: 'pending' })
    expect(result).toEqual({
      state: 'pending',
      notifications: [pendingNotification],
      count: 1,
      pages: 1,
    })
    expect(fetchRealizedNotifications).not.toHaveBeenCalled()
  })

  it('reads only realized notifications for the given year', async () => {
    const result = await listNotifications(client, {
      state: 'realized',
      year: 2026,
    })
    expect(result).toEqual({
      state: 'realized',
      notifications: [realizedNotification],
      count: 1,
      pages: 3,
    })
    expect(fetchPendingNotifications).not.toHaveBeenCalled()
    expect(fetchRealizedNotifications).toHaveBeenCalledWith(
      client,
      'TOKEN',
      2026,
    )
  })

  it('combines both for state=all', async () => {
    const result = await listNotifications(client, { state: 'all', year: 2026 })
    expect(result.count).toBe(2)
    expect(result.pages).toBe(4)
    expect(result.notifications).toEqual([
      pendingNotification,
      realizedNotification,
    ])
  })

  it('requires a year for realized and all', async () => {
    await expect(
      listNotifications(client, { state: 'realized' }),
    ).rejects.toThrow('--year is required')
    await expect(listNotifications(client, { state: 'all' })).rejects.toThrow(
      '--year is required',
    )
  })
})
