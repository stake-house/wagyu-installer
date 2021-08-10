type StatusDetails = {
  text: string;
  code: number;
  character: string;
  color: string;
};

export enum Status {
  'Online' = 'Online',
  'Syncing' = 'Syncing',
  'Offline' = 'Offline',
  'Loading' = 'Loading',
}

export type AllStatuses =
  | Status.Online
  | Status.Syncing
  | Status.Offline
  | Status.Loading;

export type NodeStatuses = {
  [key in AllStatuses]: StatusDetails;
};
