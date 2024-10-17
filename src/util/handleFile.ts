import { generateName } from "../util/name.ts";
import { parseEpub } from "../util/parseEpub.ts";
import type { EpubFileEntry } from "../types.ts";

export async function handleFile(
  fileEntry: EpubFileEntry,
  retailer?: string,
  extra?: string) {
  const epubPath = fileEntry.directory
    ? `${fileEntry.directory}/${fileEntry.file.name}`
    : fileEntry.file.name;
  const bookData = await parseEpub(epubPath);
  // Rename file
  bookData.retailer ||= retailer;
  bookData.extra ||= extra;
  const newName = generateName(bookData);
  console.log('Renaming:', fileEntry.file.name, '->', newName);
  const newPath = fileEntry.directory
    ? `${fileEntry.directory}/${newName}.epub`
    : `${newName}.epub`;

  await Deno.rename(epubPath, newPath);
}
