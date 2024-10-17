import { readZip } from 'https://deno.land/x/jszip/mod.ts';
import { parse } from 'jsr:@libs/xml/parse';
import type { BookData } from '../types.ts';

export async function parseEpub(epubPath: string): Promise<BookData> {
  const zip = await readZip(epubPath);

  // find .opf file
  // const opfFile = zip.file((file) => file.name.endsWith('.opf'));
  const files = zip.files();
  const [opfName, opfFile] =
    Object.entries(files).find(([name, _]) => name.endsWith('.opf')) || [];

  if (!opfFile || !opfName) {
    throw new Error('No .opf file found in epub: ' + epubPath);
  }

  const opfData = await opfFile.async('string');

  const parsed = parse(opfData);
  // @ts-ignore - it's fine
  const metadata = parsed['package']['metadata'];
  if (!metadata) {
    throw new Error('No metadata found in .opf file: ' + epubPath);
  }
  const title = metadata['dc:title']?.['#text'] || metadata['dc:title'];
  const author =
    metadata['dc:creator']?.[0]?.['#text'] ||
    metadata['dc:creator']?.['#text'] ||
    metadata['dc:creator'];
  const publisher =
    metadata['dc:publisher']?.['#text'] || metadata['dc:publisher'];
  const dcDate = metadata['dc:date']?.['#text'] || metadata['dc:date'];
  // @property === dcterms:modified
  const modified = metadata.meta?.find(
    // @ts-ignore - it's fine
    (meta: Array<unknown>) => meta['@property'] === 'dcterms:modified'
  )?.['#text'];

  const date = new Date(dcDate || modified || 0);

  return {
    author,
    date,
    title,
    publisher,
  };
}
