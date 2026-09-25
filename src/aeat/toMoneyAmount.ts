import type { MoneyAmount } from './MoneyAmount'
import { parseEuroAmount } from './parseEuroAmount'

/** Wrap a portal amount string as a `MoneyAmount`, keeping the original text. */
export const toMoneyAmount = (text: string): MoneyAmount => ({
  text,
  amount: parseEuroAmount(text),
})
