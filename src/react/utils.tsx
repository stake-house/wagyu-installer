import { shell } from 'electron';
export const sendToEthStakerDiscord = () => {
  shell.openExternal('http://invite.gg/ethstaker');
};

export const sendToEthStakerSubreddit = () => {
  shell.openExternal('https://www.reddit.com/r/ethstaker/');
};

export const sendToGoerliEtherscan = () => {
  shell.openExternal('http://goerli.etherscan.io/');
};

export const sendToPyrmontBeaconchain = () => {
  shell.openExternal('https://pyrmont.beaconcha.in/');
};

export const sendToGetGoerliEth = () => {
  shell.openExternal(
    'https://www.reddit.com/r/ethstaker/comments/ij56ox/best_way_to_get_goerli_ether/',
  );
};

export const sendToEthereumStudymaster = () => {
  shell.openExternal('https://ethereumstudymaster.com/');
};
