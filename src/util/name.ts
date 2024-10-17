import type { BookData } from '../types.ts';

export function generateName(bookData: BookData): string {
  // [Author] YYYYMMDD - v01 Title (Publisher - Label) (Retailer) [Extra Information] {Revision}
  const dateString =
    bookData.date instanceof Date
      ? bookData.date.toISOString().slice(0, 10).replace(/-/g, '')
      : bookData.date;

  // Remove spaces and full-width spaces from author name
  const cleanAuthor = bookData.author?.replace(/[ 　]/g, '');

  const name = `[${cleanAuthor}] ${dateString} - ${bookData.title} (${
    bookData.publisher
  }${bookData.label ? ` - ${bookData.label}` : ''})${
    bookData.retailer ? ` (${bookData.retailer})` : ''
  }${bookData.extra ? ` [${bookData.extra}]` : ''}`;
  return sanitize(name);
}

/**
 * Remove characters that are not allowed in filenames
 */
function sanitize(name: string): string {
  return name.replace(/[\/\\?%*:|"<>？％＊：｜＂＜＞]/g, '');
}
