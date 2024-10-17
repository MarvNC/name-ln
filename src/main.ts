import { parseArgs } from 'https://deno.land/std/cli/parse_args.ts';
import { processEpubFiles } from './processEpubFiles.ts';

function printHelp() {
  console.log(`
Usage: ./name-ln.exe --allow-read --allow-write main.ts [options] <files or directories>

Options:
  --retailer, -r  Specify the retailer name
  --extra, -e     Specify extra information

Examples:
  ./name-ln.exe --allow-read --allow-write main.ts --retailer Bookwalker --extra Promo file1.epub file2.epub
  ./name-ln.exe --allow-read --allow-write main.ts -r Bookwalker -e Promo dir1 dir2
  `);
}

function parseArguments() {
  const args = Deno.args;
  if (args.length === 0) {
    printHelp();
    Deno.exit(1);
  }

  const parsedArgs = parseArgs(Deno.args, {
    string: ['retailer', 'extra'],
    alias: {
      retailer: 'r',
      extra: 'e',
      help: 'h',
    },
  });

  if (parsedArgs.help) {
    printHelp();
    Deno.exit(0);
  }

  return {
    retailer: parsedArgs.retailer,
    extra: parsedArgs.extra,
    filesOrDirs: parsedArgs._,
  };
}

async function main() {
  const { retailer, extra, filesOrDirs } = parseArguments();

  await processEpubFiles(filesOrDirs, retailer, extra);
}

if (import.meta.main) {
  main();
}
