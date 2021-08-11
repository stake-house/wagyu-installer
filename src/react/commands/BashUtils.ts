import {
  executeCommandSync,
  executeCommandSyncReturnStdout,
} from './ExecuteCommand';

export const doesFileExist = (filename: string): boolean => {
  const cmd = 'test -f ' + filename;
  const result = executeCommandSync(cmd);
  return result == 0;
};

// TODO: add error handling
export const readlink = (file: string): string => {
  return executeCommandSyncReturnStdout('readlink -f ' + file).trim();
};

export const which = (tool: string): boolean => {
  const cmd = 'which ' + tool;
  const result = executeCommandSync(cmd);
  return result == 0;
};
