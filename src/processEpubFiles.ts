import type { EpubFileEntry } from './types.ts';
import { handleFile } from './util/handleFile.ts';
import { isEpub } from './util/isEpub.ts';
import { basename, dirname } from 'https://deno.land/std@0.116.0/path/mod.ts';

export async function processEpubFiles(
  filesOrDirs: (string | number)[],
  retailer: string | undefined,
  extra: string | undefined
) {
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
      const dirPath = Deno.realPathSync(fileOrDir);
      for await (const entry of dir) {
        if (isEpub(entry.name)) {
          epubFilesToHandle.push({ directory: dirPath, file: entry });
        }
      }
    } else {
      if (!isEpub(fileOrDir)) {
        console.log('Not an epub file:', fileOrDir);
        continue;
      }
      // get directory
      const dirPath = dirname(Deno.realPathSync(fileOrDir));
      const fileName = basename(fileOrDir);

      epubFilesToHandle.push({
        directory: dirPath,
        file: {
          name: fileName,
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

  console.log('Done!');
  Deno.exit(0);
}
