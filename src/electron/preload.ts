// preload.ts
/**
 * This typescript file contains the API used by the UI to call the electron modules.
 */

import {
  contextBridge,
  shell,
  clipboard,
  ipcRenderer,
  OpenDialogOptions,
  OpenDialogReturnValue
} from "electron";
import { Network } from "../react/types";

import { doesDirectoryExist, findFirstFile } from './BashUtils';

import { EthDockerInstaller } from './EthDockerInstaller';
import { InstallDetails } from "./IMultiClientInstaller";

const ethDockerInstaller = new EthDockerInstaller();
const ethDockerPreInstall = async (): Promise<boolean> => {
  return ethDockerInstaller.preInstall();
};
const ethDockerInstall = async (details: InstallDetails): Promise<boolean> => {
  return ethDockerInstaller.install(details);
};
const ethDockerImportKeys = async (
  network: Network,
  keyStoreDirectoryPath: string,
  keyStorePassword: string): Promise<boolean> => {
  return ethDockerInstaller.importKeys(network, keyStoreDirectoryPath, keyStorePassword);
};
const ethDockerPostInstall = async (network: Network): Promise<boolean> => {
  return ethDockerInstaller.postInstall(network);
};
const ethDockerStartNodes = async (network: Network): Promise<boolean> => {
  return ethDockerInstaller.startNodes(network);
};
const ethDockerStopNodes = async (network: Network): Promise<boolean> => {
  return ethDockerInstaller.stopNodes(network);
};

const ipcRendererSendClose = () => {
  ipcRenderer.send('close');
};

const invokeShowOpenDialog = (options: OpenDialogOptions): Promise<OpenDialogReturnValue> => {
  return ipcRenderer.invoke('showOpenDialog', options);
};

contextBridge.exposeInMainWorld('electronAPI', {
  'shellOpenExternal': shell.openExternal,
  'shellShowItemInFolder': shell.showItemInFolder,
  'clipboardWriteText': clipboard.writeText,
  'ipcRendererSendClose': ipcRendererSendClose,
  'invokeShowOpenDialog': invokeShowOpenDialog
});

contextBridge.exposeInMainWorld('bashUtils', {
  'doesDirectoryExist': doesDirectoryExist,
  'findFirstFile': findFirstFile
});

contextBridge.exposeInMainWorld('ethDocker', {
  'preInstall': ethDockerPreInstall,
  'install': ethDockerInstall,
  'importKeys': ethDockerImportKeys,
  'postInstall': ethDockerPostInstall,
  'startNodes': ethDockerStartNodes,
  'stopNodes': ethDockerStopNodes
});