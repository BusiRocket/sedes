import { writeProsaPdf } from '../prosa/writeProsaPdf'

/** Write the informe as `tgss-vida-laboral-<label>.pdf` under `outDir`. */
export const writeVidaLaboralPdf = async (
  outDir: string,
  label: string,
  pdf: Buffer,
): Promise<string> => writeProsaPdf(outDir, 'vida-laboral', label, pdf)
