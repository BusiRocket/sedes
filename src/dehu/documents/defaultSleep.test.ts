import { afterEach, describe, expect, it, vi } from 'vitest'

import { defaultSleep } from './defaultSleep'

describe('defaultSleep', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('resolves once the requested time has passed', async () => {
    vi.useFakeTimers()
    const settled = vi.fn()
    // the pending promise is observed through the timer, not awaited
    // eslint-disable-next-line promise/prefer-await-to-then
    void defaultSleep(1_500).finally(settled)

    await vi.advanceTimersByTimeAsync(1_499)
    expect(settled).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(1)
    expect(settled).toHaveBeenCalledOnce()
  })
})
