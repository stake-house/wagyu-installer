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
  OpenDialogReturnValue,
} from "electron";
import { Network } from "../react/types";

import { doesDirectoryExist, findFirstFile } from "./BashUtils";

import { EthDockerInstaller } from "./EthDockerInstaller";
import { InstallDetails, OutputLogs } from "./IMultiClientInstaller";

import { Writable } from "stream";

const ethDockerInstaller = new EthDockerInstaller();
const ethDockerPreInstall = async (outputLogs?: OutputLogs): Promise<boolean> => {
  return ethDockerInstaller.preInstall(outputLogs);
};
const ethDockerInstall = async (
  details: InstallDetails,
  outputLogs?: OutputLogs,
): Promise<boolean> => {
  return ethDockerInstaller.install(details, outputLogs);
};
const ethDockerImportKeys = async (
  network: Network,
  keyStoreDirectoryPath: string,
  keyStorePassword: string,
): Promise<boolean> => {
  return ethDockerInstaller.importKeys(network, keyStoreDirectoryPath, keyStorePassword);
};
const ethDockerPostInstall = async (
  network: Network,
  outputLogs?: OutputLogs,
): Promise<boolean> => {
  return ethDockerInstaller.postInstall(network, outputLogs);
};
const ethDockerStartNodes = async (
  network: Network,
  outputLogs?: OutputLogs,
): Promise<boolean> => {
  return ethDockerInstaller.startNodes(network, outputLogs);
};
const ethDockerStopNodes = async (
  network: Network,
  outputLogs?: OutputLogs,
): Promise<boolean> => {
  return ethDockerInstaller.stopNodes(network, outputLogs);
};

const ipcRendererSendClose = () => {
  ipcRenderer.send("close");
};

const invokeShowOpenDialog = (
  options: OpenDialogOptions,
): Promise<OpenDialogReturnValue> => {
  return ipcRenderer.invoke("showOpenDialog", options);
};

contextBridge.exposeInMainWorld("electronAPI", {
  shellOpenExternal: shell.openExternal,
  shellShowItemInFolder: shell.showItemInFolder,
  clipboardWriteText: clipboard.writeText,
  ipcRendererSendClose: ipcRendererSendClose,
  invokeShowOpenDialog: invokeShowOpenDialog,
});

contextBridge.exposeInMainWorld("bashUtils", {
  doesDirectoryExist: doesDirectoryExist,
  findFirstFile: findFirstFile,
});

contextBridge.exposeInMainWorld("ethDocker", {
  preInstall: ethDockerPreInstall,
  install: ethDockerInstall,
  importKeys: ethDockerImportKeys,
  postInstall: ethDockerPostInstall,
  startNodes: ethDockerStartNodes,
  stopNodes: ethDockerStopNodes,
});
