import React from 'react'
import {shallow} from 'enzyme';
describe('testing navigation', () => {

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
/**

 import React from 'react'
 import {shallow} from 'enzyme';
 import { render } from "react-testing-library"
 import Component from "./Component"
 import {Nav} from "react-bootstrap";
 describe('testing navigation', () => {

it('testing whether the component will render correctly', () => {
    shallow(<topbar/>);
  });
 it('topbar should render links correctly', () => {
     const links =
    [{link: 'https://student-study-help.eu-gb.mybluemix.net/profile', text: 'Profile'},
        {link: 'https://student-study-help.eu-gb.mybluemix.net/create-study-session', text: 'Create Study session'},
        {link: 'https://student-study-help.eu-gb.mybluemix.net/find-study-session', text: 'Find Study session'},
        {link: 'https://student-study-help.eu-gb.mybluemix.net/aboutus', text: 'About Us'}];
     const component = shallow(<topbar/>);
     expect(item).toMatchSnapshot();
  });
    "/somewhere"
    it("Component renders link to /profile", () => {
        const { getByText } = render( <Nav.Link href="/profile">Profile</Nav.Link>)
        expect(document.querySelector("Nav.Link").getAttribute("href")).toBe(
            "/somewhere"
        )})

});
jest.mock("../../data/data", () => {
    return {
        link: jest.fn(() => {
            return {
                title: "something",
                links: [
                    {location: "/profile", text: "Profile"},
                    {location: "/create-study-session", text: "Create Study session"},
                    {location: "/find-study-session", text: "Find Study session"},
                    {location: "/aboutus", text: "About Us"},
                ],}}),}})

 **/
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