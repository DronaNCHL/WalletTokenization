import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './Header';
import OTP from "../components/StepTwo"

export default {
    title: 'Example/Tokenization steps/Step2',
    component: OTP,
    parameters: {
      // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  };

  const Template = (args) => <OTP {...args} />;

  export const Step2 = Template.bind({});
  Template.parameters = {
    layout: 'centered',
  };
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  OTP.args = {
    
  };