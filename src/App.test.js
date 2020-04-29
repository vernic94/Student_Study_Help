import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { shallow } from 'enzyme';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
     //shallow() is a type of unit test for React
     //Tests the component we are providing (App), and ignores any child components that may be present in the component tree thereafter
      shallow(<App />);
    });
});
