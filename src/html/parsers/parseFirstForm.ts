import type { HtmlForm } from '../types/HtmlForm'
import { parseForms } from './parseForms'

/** The first form on a page, or undefined when the page carries none. */
export const parseFirstForm = (
  html: string,
  baseUrl: string,
): HtmlForm | undefined => parseForms(html, baseUrl)[0]
