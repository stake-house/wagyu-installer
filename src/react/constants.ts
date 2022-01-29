import { StepKey } from './types';

export const errors = {
	FOLDER: "Please select a folder.",
	FOLDER_DOES_NOT_EXISTS: "Folder does not exist. Select an existing folder.",
	FOLDER_IS_NOT_WRITABLE: "Cannot write in this folder. Select a folder in which you have write permission.",
};

export const stepLabels = {
	[StepKey.SystemCheck]: 'System Check',
	[StepKey.Configuration]: 'Configuration',
	[StepKey.Installing]: 'Install',
};
