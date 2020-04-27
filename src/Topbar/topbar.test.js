import React from 'react'
import {shallow} from 'enzyme';
import { Link } from "react-router-dom";
import renderer from './topbar'
import {Nav} from "react-bootstrap";
describe('testing navigation', () => {
   /** TODO
    it('renders correctly', () => {
   const item = renderer
    .create(
        <Link to="profile">Profile</Link>&nbsp,
        <Link to="create-study-session">Create Study Session</Link>&nbsp,
        <Link to="study-session">Study Session</Link>&nbsp,
        <Link to="maps">Map</Link>&nbsp,
        <Link to="aboutus">About Us</Link>)
       .toJSON();
  expect(item).toMatchSnapshot();
 });
**/
it('testing whether the component will render correctly', () => {
    shallow(<topbar/>);
  });
 it('topbar should render links correctly', () => {
    const links = 
    [{link: 'https://student-study-help.eu-gb.mybluemix.net/profile', text: 'Profile'},
     {link: 'https://student-study-help.eu-gb.mybluemix.net/create-study-session', text: 'Study session'},
     {link: 'https://student-study-help.eu-gb.mybluemix.net/maps', text: 'Map'},
     {link: 'https://student-study-help.eu-gb.mybluemix.net/aboutus', text: 'About Us'}];
     const component = shallow(<topbar/>);
     expect(component).toMatchSnapshot();
  });
});