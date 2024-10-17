import { BlobReader, ZipReader } from 'jsr:@zip-js/zip-js';
import type { BookData } from './types.ts';

export async function parseEpub(epubPath: string) {
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
    console.log('No .opf file found in epub:', epubPath);
    return;
  }

  // read .opf file
  const opfData = await opfFile.getData!(new BlobReader());}
