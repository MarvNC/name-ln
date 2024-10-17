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

### GUI (Windows)

<!-- https://github.com/MarvNC/name-ln/releases/download/v1.2.0/gui.exe -->

- Download the [Windows .exe GUI](https://github.com/MarvNC/name-ln/releases/download/v1.2.0/gui.exe) and the [latest release of the CLI](https://github.com/MarvNC/name-ln/releases/latest/download/name-ln.exe).
- Ensure that `gui.exe` and `name-ln.exe` are in the same directory and that you don't change the name of `name-ln.exe`.
- Open `gui.exe` and drag and drop files or directories onto the window, then fill out appropriate fields if necessary and hit the rename button to rename.

### CLI (all platforms)

```bash
<path-to-binary> --allow-read --allow-write main.ts [options] <files or directories>

Options:
  --retailer, -r  Specify the retailer name
  --extra, -e     Specify extra information

Examples:
  <path-to-binary> --allow-read --allow-write main.ts --retailer Bookwalker --extra Promo file1.epub file2.epub
  <path-to-binary> --allow-read --allow-write main.ts -r Bookwalker -e Promo dir1 dir2
```
