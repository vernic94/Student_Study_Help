import React from 'react'
import { Item } from '@rossbulat/nav'
import renderer from './topbar'
//import icon from './img/ross.png'
describe('testing navigation', () => {
 /*
    it('renders correctly', () => {
   const item = renderer
    .create(
       <Item 
         link="https://student-study-help.eu-gb.mybluemix.net/profile" 
         text="" 
         //icon={icon} 
         />
     ).toJSON();
  expect(item).toMatchSnapshot();
 });
 */
 
 it('sidebar should render links correctly', () => {
    const links = 
    [{link: 'https://student-study-help.eu-gb.mybluemix.net/profile', text: 'Profile'},
     {link: 'https://student-study-help.eu-gb.mybluemix.net/create-study-session', text: 'Study session'},
     {link: 'https://student-study-help.eu-gb.mybluemix.net/maps', text: 'Map'},
     {link: 'https://student-study-help.eu-gb.mybluemix.net/aboutus', text: 'About Us'}];
     const component = shallow(<topbar/>);
     expect(component).toMatchSnapshot();
  });
});