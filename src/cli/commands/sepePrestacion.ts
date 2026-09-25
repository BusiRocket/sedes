import { readLastBenefit } from '../../sepe/benefits/readLastBenefit'
import type { Command } from '../types/Command'

export const sepePrestacion: Command = {
  portal: 'sepe',
  action: 'prestacion',
  description:
    "Read the holder's last recognised unemployment benefit at the SEPE (situación, dates, days granted and consumed)",
  options: [],
  run: async (client): Promise<unknown> => readLastBenefit(client),
}
