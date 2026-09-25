import { describe, expect, it } from 'vitest'

import { groupXrefRuns } from './groupXrefRuns'

describe('groupXrefRuns', () => {
  it('sorts and splits into consecutive runs', () => {
    const at = (num: number) => ({ num, gen: 0, offset: num * 10 })
    const runs = groupXrefRuns([at(5), at(1), at(4), at(7)])
    expect(runs.map((run) => [run.first, run.entries.length])).toEqual([
      [1, 1],
      [4, 2],
      [7, 1],
    ])
  })
})
