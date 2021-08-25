import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SystemCheck } from './SystemCheck';

export default {
  title: 'Example/SystemCheckNew',
  component: SystemCheck,
} as ComponentMeta<typeof SystemCheck>;

const Template: ComponentStory<typeof SystemCheck> = () => {
  return <SystemCheck />;
};

export const LoggedIn = Template.bind({});
