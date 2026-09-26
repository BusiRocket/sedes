import { htmlToText } from '../../html/htmlToText'
import type { GobexGrid } from '../types/GobexGrid'
import { parseTableRows } from './parseTableRows'

/**
 * Every grid on a Carpeta Ciudadana page. Each draws its column titles as a
 * separate `columnas_rejilla` table, followed by the rich-table holding the
 * rows; a page can carry several (a search result and a modal panel).
 */
export const parseGrids = (html: string): GobexGrid[] =>
  [
    ...html.matchAll(
      /class="columnas_rejilla"[\s\S]*?(<table\b[\s\S]*?<\/table>)[\s\S]*?<table class="rich-table[^"]*" id="([^"]+)"/g,
    ),
  ].map(([, titles = '', id = '']) => ({
    id,
    headers: [...titles.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(
      ([, cell = '']) => htmlToText(cell),
    ),
    rows: parseTableRows(html, id),
  }))
