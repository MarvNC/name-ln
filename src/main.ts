import { parseArgs } from 'https://deno.land/std/cli/parse_args.ts';
import { parseEpub } from './parseEpub.ts';
import { generateName } from './name.ts';
import type { EpubFileEntry } from './types.ts';

if (import.meta.main) {
  // read args
  const args = Deno.args;
  if (args.length === 0) {
    console.log('Please provide a file to rename');
    Deno.exit(1);
  }
  // Args: retailer, extra, also shortened versions
  const parsedArgs = parseArgs(Deno.args, {
    string: ['retailer', 'extra', 'r', 'e'],
  });

  const retailer = parsedArgs.retailer || parsedArgs.r;
  const extra = parsedArgs.extra || parsedArgs.e;
  const filesOrDirs = parsedArgs._;

  const epubFilesToHandle: EpubFileEntry[] = [];

  for (const fileOrDir of filesOrDirs) {
    if (typeof fileOrDir !== 'string') {
      console.log('Invalid file or directory:', fileOrDir);
      continue;
    }

    // Check if file or dir
    console.log('Checking:', fileOrDir);
    const fileInfo = await Deno.lstat(fileOrDir);
    if (fileInfo.isDirectory) {
      // Read directory
      const dir = Deno.readDir(fileOrDir);
      for await (const entry of dir) {
        if (isEpub(entry.name)) {
          epubFilesToHandle.push({ directory: fileOrDir, file: entry });
        }
      }
    } else {
      if (!isEpub(fileOrDir)) {
        console.log('Not an epub file:', fileOrDir);
        continue;
      }
      epubFilesToHandle.push({
        directory: '',
        file: {
          name: fileOrDir,
          isFile: true,
          isDirectory: false,
          isSymlink: false,
        },
      });
    }
  }

  console.log(`Processing ${epubFilesToHandle.length} epub files...`);

  // Handle all collected epub files
  for (const fileEntry of epubFilesToHandle) {
    await handleFile(fileEntry, retailer, extra);
  }

  // console.log('Done!');
  // Deno.exit(0);
}

function isEpub(filepath: string): boolean {
  return filepath.endsWith('.epub');
}

async function handleFile(
  fileEntry: EpubFileEntry,
  retailer?: string,
  extra?: string
) {
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
