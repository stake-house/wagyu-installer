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

import { doesDirectoryExist, findFirstFile } from './BashUtils';

import { EthDockerInstaller } from './EthDockerInstaller';

const ethDockerInstaller = new EthDockerInstaller();
const ethDockerPreInstall = async (): Promise<boolean> => {
  return ethDockerInstaller.preInstall();
}

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

console.log('exposeInMainWorld');
contextBridge.exposeInMainWorld('ethDocker', {
  'preInstall': ethDockerPreInstall
});