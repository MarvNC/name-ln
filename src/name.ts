export type BookData = {
  author: string;
  date: Date | string;
  title: string;
  publisher: string;
  label?: string;
  retailer?: string;
  extra?: string;
};

export function generateName(bookData: BookData): string {
  // [Author] YYYYMMDD - v01 Title (Publisher - Label) (Retailer) [Extra Information] {Revision}
  const dateString =
    bookData.date instanceof Date
      ? bookData.date.toISOString().slice(0, 10).replace(/-/g, '')
      : bookData.date;

  // Remove spaces and full-width spaces from author name
  const cleanAuthor = bookData.author.replace(/[ 　]/g, '');

  return `[${cleanAuthor}] ${dateString} - v01 ${bookData.title} (${
    bookData.publisher
  }${bookData.label ? ` - ${bookData.label}` : ''})${
    bookData.retailer ? ` (${bookData.retailer})` : ''
  }${bookData.extra ? ` [${bookData.extra}]` : ''}`;
}
