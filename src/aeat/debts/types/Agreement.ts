import type { AgreementDetail } from './AgreementDetail'

/** One SRAF deferral/instalment agreement: its code plus everything read off its detail page. */
export type Agreement = AgreementDetail & {
  readonly acuerdo: string
}
