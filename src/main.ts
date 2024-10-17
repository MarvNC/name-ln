import { parseArgs } from 'https://deno.land/std/cli/parse_args.ts';
import { parseEpub } from './parseEpub.ts';

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

  const epubFilesToHandle: string[] = [];

  for (const fileOrDir of filesOrDirs) {
    if (typeof fileOrDir !== 'string') {
      console.log('Invalid file or directory:', fileOrDir);
      continue;
    }

    // Check if file or dir
    const fileInfo = await Deno.lstat(fileOrDir);
    if (fileInfo.isDirectory) {
      // Read directory
      const dir = Deno.readDir(fileOrDir);
      const dirEntries = [];
      for await (const entry of dir) {
        dirEntries.push(entry);
      }
      // Collect all epubs in directory
      const epubFiles = dirEntries.filter((file) => isEpub(file.name));
      for (const file of epubFiles) {
        epubFilesToHandle.push(file.name);
      }
    } else {
      if (!isEpub(fileOrDir)) {
        console.log('Not an epub file:', fileOrDir);
        continue;
      }
      epubFilesToHandle.push(fileOrDir);
    }
  }

  console.log(`Processing ${epubFilesToHandle.length} epub files...`);

  // Handle all collected epub files
  for (const epubFile of epubFilesToHandle) {
    handleFile(epubFile, retailer, extra);
  }
}

function isEpub(filepath: string): boolean {
  return filepath.endsWith('.epub');
}

function handleFile(filepath: string, retailer?: string, extra?: string) {
  const bookData = parseEpub(filepath);
}
