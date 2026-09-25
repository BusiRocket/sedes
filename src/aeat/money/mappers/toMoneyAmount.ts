import { parseEuroAmount } from '../parsers/parseEuroAmount'
import type { MoneyAmount } from '../types/MoneyAmount'

/** Wrap a portal amount string as a `MoneyAmount`, keeping the original text. */
export const toMoneyAmount = (text: string): MoneyAmount => ({
  text,
  amount: parseEuroAmount(text),
})
