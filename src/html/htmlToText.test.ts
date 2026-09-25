import { describe, expect, it } from 'vitest'

import { htmlToText } from './htmlToText'
import { unescapeHtml } from './unescapeHtml'

describe('htmlToText', () => {
  it('drops scripts, styles and tags and collapses whitespace', () => {
    expect(
      htmlToText(
        '<script>var a=1</script><style>p{}</style><p>Importe&nbsp;total:</p>\n<b> 1.234,56&nbsp;&euro;</b>',
      ),
    ).toBe('Importe total: 1.234,56 €')
  })
})

describe('unescapeHtml', () => {
  it('decodes numeric and named entities and leaves unknown ones alone', () => {
    expect(unescapeHtml('&#241;&#xE9;&ntilde;&Aacute;&amp;&unknown;')).toBe(
      'ñéñÁ&&unknown;',
    )
  })
})
