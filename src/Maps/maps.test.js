import React from 'react';
import { shallow } from 'enzyme';
import Maps from './maps';


describe('React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<Maps />);
    });
});