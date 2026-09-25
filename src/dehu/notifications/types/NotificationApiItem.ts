/** One raw DEHU notification item, validated but not yet mapped to the listing's shape. */
export type NotificationApiItem = {
  readonly identifier: string
  /** The reference the documents of a realized notification are fetched by. */
  readonly sentReference?: string | undefined
  readonly concept: string
  readonly emitterEntity: string
  readonly availabilityDate: string
  readonly nifTitular?: string | undefined
  readonly expirationDate?: string | undefined
  readonly state?: string | undefined
}
