import React from 'react';
import { shallow } from 'enzyme';
import CreateAccount from './createaccount';

describe('React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<CreateAccount />);
    });
});