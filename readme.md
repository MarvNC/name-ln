# Light Novel Namer

A CLI utility that implements the [Light Novel Naming Scheme](https://github.com/MarvNC/light-novel-naming-scheme) to standardize the naming of light novel files and directories.

## Purpose

This tool automatically renames light novel files and directories according to a consistent naming format:

```
[Author] YYYYMMDD - v01 Title (Publisher - Label) (Retailer) [Extra Information]
```

It helps maintain organized collections by ensuring:

- Chronological sorting
- Consistent formatting
- Machine-readable filenames
- Preservation of original titles

## Usage

```bash
./name-ln.exe --allow-read --allow-write main.ts [options] <files or directories>

Options:
  --retailer, -r  Specify the retailer name
  --extra, -e     Specify extra information

Examples:
  ./name-ln.exe --allow-read --allow-write main.ts --retailer Bookwalker --extra Promo file1.epub file2.epub
  ./name-ln.exe --allow-read --allow-write main.ts -r Bookwalker -e Promo dir1 dir2
```
