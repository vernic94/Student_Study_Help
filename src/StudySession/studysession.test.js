import React from 'react';
import { shallow, mount } from 'enzyme';
import StudySession from './studysession';
import { cleanup } from '@testing-library/react';

//describe("StudySession", () => {
   // let studySession = new StudySession();
 
   // beforeEach(() => {
   //    studySession = new StudySession();
   // });

   afterEach(cleanup);

   describe('React component test with Enzyme', () => {
      it('renders without crashing', () => {
         const wrapper = shallow(<StudySession />);
         expect(wrapper.exists()).toBe(true);
         //expect(wrapper).toContainReact(StudySession);
         //expect(wrapper.find("button").text()).toContain("Create a study session");
      });
   });

   // describe("all the functions are present", () => {
   //    it("contains all the default functions", () => {
   //    let functions = [
   //       studySession.choiceCreateStudySession,
   //       studySession.choicePlanStudySession,
   //       studySession.createStudySession,
   //    ];
   //    functions.forEach(func => expect(typeof func).to.equal('function'));
   //    })
   // });

   // it("renders with or without study session parameters", () => {
   //    act(() => {
   //      render(<StudySession />, container);
   //    });
   //    expect(container.textContent).toBe("Hey, stranger");
    
   //    act(() => {
   //      render(<StudySession name="Jenny" />, container);
   //    });
   //    expect(container.textContent).toBe("Hello, Jenny!");
    
   //    act(() => {
   //      render(<StudySession name="Margaret" />, container);
   //    });
   //    expect(container.textContent).toBe("Hello, Margaret!");
   //  });

  

//});