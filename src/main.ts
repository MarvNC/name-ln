import { parseArgs } from 'https://deno.land/std/cli/parse_args.ts';

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

  for (const fileOrDir of filesOrDirs) {
    if (typeof fileOrDir !== 'string') {
      console.log('Invalid file or directory:', fileOrDir);
      continue;
    }
    // Check if file or dir
    const fileInfo = await Deno.lstat(fileOrDir);
    if (fileInfo.isDirectory) {
      console.log('Directory:', fileOrDir);
    } else {
      console.log('File:', fileOrDir);
    }
  }
}
