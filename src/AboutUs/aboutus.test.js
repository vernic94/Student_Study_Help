import React from 'react';
import { shallow } from 'enzyme';
import AboutUs from './aboutus';

describe('React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<AboutUs />);
    });
});