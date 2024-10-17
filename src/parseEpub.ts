import { BlobReader, TextWriter, ZipReader } from 'jsr:@zip-js/zip-js';
import { parse } from 'jsr:@libs/xml/parse';
import type { BookData } from './types.ts';

export async function parseEpub(epubPath: string): Promise<BookData> {
  // Read zip file and look for .opf file
  // Read .opf file with xml parser and extract metadata
  // Return BookData object

  const zipData = await Deno.readFile(epubPath);

  const zipFileReader = new BlobReader(new Blob([zipData]));
  const zipReader = new ZipReader(zipFileReader);
  const entries = await zipReader.getEntries();

  // find .opf file
  const opfFile = entries.find((entry) => entry.filename.endsWith('.opf'));

  if (!opfFile) {
    throw new Error('No .opf file found in epub: ' + epubPath);
  }

  // read .opf file
  console.log('Reading .opf file:', opfFile.filename);
  const opfData = await opfFile.getData!(new TextWriter());

  const parsed = parse(opfData);
  // @ts-ignore - it's fine
  const metadata = parsed['package']['metadata'];
  if (!metadata) {
    throw new Error('No metadata found in .opf file: ' + epubPath);
  }
  const title = metadata['dc:title']?.['#text'];
  const author = metadata['dc:creator']?.['#text'];
  const publisher = metadata['dc:publisher']?.['#text'];
  const dcDate = metadata['dc:date']?.['#text'];
  // @property === dcterms:modified
  const modified = metadata.meta?.find(
    // @ts-ignore - it's fine
    (meta: Array<unknown>) => meta['@property'] === 'dcterms:modified'
  )?.['#text'];

  const date = new Date(dcDate || modified);

  return {
    author,
    date,
    title,
    publisher,
  };
}
