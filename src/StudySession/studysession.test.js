import React from 'react';
import { shallow } from 'enzyme';
import StudySession from './studysession';

describe('React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<StudySession />);
    });
});