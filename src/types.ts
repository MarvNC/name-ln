export type BookData = {
  author?: string;
  date?: Date | string;
  title?: string;
  publisher?: string;
  label?: string;
  retailer?: string;
  extra?: string;
};

export type EpubFileEntry = {
  directory: string;
  file: Deno.DirEntry;
};
