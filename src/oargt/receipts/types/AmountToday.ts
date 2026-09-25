/** What an enforced receipt costs today, as the portal's `CALCULAR_IMP` event computes it: principal plus surcharge, interest and costs. */
export type AmountToday = {
  readonly principal: number
  readonly surcharge: number
  readonly interest: number
  readonly costs: number
  readonly total: number
  /** `total` rendered the way the portal shows it (`169,48`). */
  readonly totalText: string
}
