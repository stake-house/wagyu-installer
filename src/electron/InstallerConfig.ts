import { open, mkdir, FileHandle } from 'fs/promises';

import path from 'path';
import os from 'os';
import { parse, Document, parseDocument } from 'yaml';

import { doesFileExist } from './BashUtils';

const configDirectoryPath = path.join(os.homedir(), '.config', 'wagyu-installer');
const configFilePath = path.join(configDirectoryPath, 'wagyu-installer.yml')

interface Configuration {
  rootDirectory: string;
}

async function getConfigFileContent(): Promise<string | undefined> {
  if (!await doesFileExist(configFilePath)) {
    return undefined;
  }

  // Open config file and read the content.
  let configFile: FileHandle | undefined = undefined;
  let configFileContent: string | undefined = undefined;
  try {
    configFile = await open(configFilePath, 'r');
    configFileContent = await configFile.readFile({ encoding: 'utf8' });
  } finally {
    await configFile?.close();
  }

  return configFileContent;
}

export async function initInstallerConfig() {
  await mkdir(configDirectoryPath, { recursive: true });
}

export async function setInstallPath(installPath: string) {
  const configFileContent = await getConfigFileContent();

  let configDocument: Document | undefined = undefined;
  if (configFileContent === undefined) {
    configDocument = new Document({
      rootDirectory: installPath
    });
  } else {
    const yamlContent = parseDocument(configFileContent as string);
    yamlContent.set('rootDirectory', installPath);
    configDocument = yamlContent;
  }

  if (configDocument !== undefined) {
    const newFileContent = configDocument?.toString();

    let configFile: FileHandle | undefined = undefined;
    try {
      configFile = await open(configFilePath, 'w');
      await configFile.write(newFileContent);
    } finally {
      await configFile?.close();
    }
  }
}

export async function getInstallPath(): Promise<string | undefined> {
  const configFileContent = await getConfigFileContent();
  if (configFileContent === undefined) {
    return undefined;
  }

  const yamlContent = parse(configFileContent as string) as Configuration;

  return yamlContent.rootDirectory;
}