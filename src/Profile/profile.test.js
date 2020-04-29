import React from 'react';
import { shallow } from 'enzyme';
import Profile from './profile';

describe('React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<Profile />);
    });
});