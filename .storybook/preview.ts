import { addDecorator } from '@storybook/react';
import { withGlobalStyles } from './decorators/withGlobalStyles';
import { withProviders } from './decorators/withProviders';

addDecorator(withGlobalStyles);
addDecorator(withProviders);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
