import type { EpubFileEntry } from './types.ts';
import { handleFile } from './util/handleFile.ts';
import { isEpub } from './util/isEpub.ts';

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

  console.log('Done!');
  Deno.exit(0);
}
