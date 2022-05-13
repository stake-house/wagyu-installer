// BashUtils.ts
/**
 * This BashUtils module provides different file and OS utility functions. Those functions should
 * work across all our supported operating systems including Linux, macOS and Windows.
 * 
 * @module
 */

import { promisify } from 'util';

import { constants, readdir } from 'fs';
import { access, stat } from 'fs/promises';

import path from "path";

const readdirProm = promisify(readdir);

/**
 * Check for the existence of a file or a directory on the filesystem.
 * 
 * @param filename The path to the file or directory.
 * 
 * @returns Returns a Promise<boolean> that includes a true value if file or directory exists.
 */
const doesFileExist = async (filename: string): Promise<boolean> => {
  try {
    await access(filename, constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Check for the existence of a directory on the filesystem.
 * 
 * @param directory The path to the directory.
 * 
 * @returns Returns a Promise<boolean> that includes a true value if the directory exists.
 */
const doesDirectoryExist = async (directory: string): Promise<boolean> => {
  if (await doesFileExist(directory)) {
    return (await stat(directory)).isDirectory();
  }
  return false;
}

/**
 * Find the first file whom filename starts with some value in a directory.
 * 
 * @param directory The path to the directory.
 * @param startsWith Filename match to look for.
 * 
 * @returns Returns a Promise<string> that includes the path to the file if found. Returns empty
 *          string if not found.
 */
const findFirstFile = async (directory: string, startsWith: string): Promise<string> => {
  const entries = await readdirProm(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.startsWith(startsWith)) {
      return path.join(directory, entry.name);
    }
  }

  return "";
}

export {
  doesFileExist,
  doesDirectoryExist,
  findFirstFile
};