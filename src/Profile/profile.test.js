import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import toJson from 'enzyme-to-json';
import { cleanup } from '@testing-library/react';

import Profile, {constructor, componentDidMount, render} from './profile';

/*describe('React component test with Enzyme', () => {
   it('renders without crashing', () => {
      shallow(<Profile />);
    });
});*/

//test the components properties with snapshot
describe("Profile", () => {
   it("Should render correctly", ()=> {
      const output = shallow(
         <Profile
            username="mockUsername"
            biogrphy="mockBiography"
            school="mockSchool"
            subject="mockSubject"
            pfpurl="mockPfpurl"
            sessions="mockSessions"
         />
      );
      expect(shallowToJson(output)).toMatchSnapshot();
   })
})