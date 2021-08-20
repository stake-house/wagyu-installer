import React from 'react';

import { HashRouter } from 'react-router-dom';

export const withProviders = (storyFn: any) => {
  return <HashRouter>{storyFn()}</HashRouter>;
};
