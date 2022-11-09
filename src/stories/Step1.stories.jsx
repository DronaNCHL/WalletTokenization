import React from 'react';
import PropTypes from 'prop-types';

import Auth from '../components/StepOne.jsx/One'

// export  {
//   title: 'AnotherExample/AnotherButton',
//   component: Button,
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// };

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template1 = (args) => <Button {...args} />;

export default {
    title: 'Example/Tokenization steps/Step1',
    component: Auth,
    parameters: {
      // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
      layout: 'fullscreen',
    },
  };

  const Template = (args) => <Auth {...args} />;

// export const Step1 = () => {  
//     return (
//       <Auth />
//     );
//   };

export const unfilled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
unfilled.args = {

};



  // export const Step1Filled = () => {  
  //   return (
  //     <Auth 
  //     isFilled = "true"
  //     fieldsDisabled = "true"
  //     FullNameValue = "Dronachandra Poudel"
  //     birthDateValue = "2000-11-15"
  //     EmailValue = "dronachandrapoudel@nchl.com.np"
  //     MobNoValue = "9843741933"
  //     />
  //   );
  // };

  export const Filled = Template.bind({});
  Filled.args = {
    isFilled : "false",
    fieldsDisabled : "true",
    FullNameValue : "Dronachandra Poudel",
    birthDateValue : "2000-11-14",
    EmailValue : "dronachandrapoudel@nchl.com.np",
      MobNoValue : "9843741933"
  }