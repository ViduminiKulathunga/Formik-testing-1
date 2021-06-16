import React from "react";
import ReactDOM from "react-dom";

import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import FormComponent from "./Component/FormComponent";

afterEach(cleanup);

it("submits correct values", async () => {
  const { container, getByLabelText,} = render(
    <FormComponent />
  );

  const name = container.querySelector('input[name="name"]');
  const age = container.querySelector('input[name="age"]');
  const userCatergory = container.querySelector('input[name="userCatergory"]');
  const commentUserCatergory = container.querySelector(
    'input[name="commentUserCatergory"]'
  );
  const dependents = container.querySelector('input[name="dependents"]');
  const acceptTerms = container.querySelector('input[name="acceptTerms"]');
  const submit = container.querySelector('button[type="submit"]');
  const result = container.querySelector('textarea[name="result"]');

  await waitFor(() => {
    fireEvent.change(name, {
      target: {
        value: "Vidumini",
      },
    });
  });
  await waitFor(() => {
    fireEvent.change(age, {
      target: {
        value: 32,
      },
    });
  });
  await waitFor(() => {
    fireEvent.change(userCatergory, {
      target: {
          value: "High",

      }
    });
  }); 
  await waitFor(() => {
    fireEvent.change(commentUserCatergory, {
      target: {
        value: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      },
    });
  });
 await waitFor(() => {
    fireEvent.change(dependents, {
      target: {
        value: 1,
      },
    });
  });
  await waitFor(() => {
    fireEvent.change(acceptTerms, {
      target: {
        value: true,
      },
    });
  });
  await waitFor(() => {
    fireEvent.click(submit)
  });
  
// expect(result.innerHTML).toBe(
//   '{"name":"Vidumini","age":32,"userCatergory":["High"],"commentUserCatergory":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","dependents":1,"acceptTerms":true}'
// );

    
const content = await screen.findByText('{"name":"Vidumini","age":32,"userCatergory":["High"],"commentUserCatergory":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","dependents":1,"acceptTerms":true}');
await waitFor(() => expect(content).toBeInTheDocument());


});


/*************** Working Bellow **************************/

// it("Render without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<FormComponent></FormComponent>, div);
// });

// it("Render form correctly", () => {
//   const { getByTestId } = render(
//     <FormComponent title="Hello Vidumini"></FormComponent>
//   );
//   expect(getByTestId("formTesting")).toHaveTextContent("Hello Vidumini");
// });

// it("matches snapshot", ()=>{
//     const tree = renderer.create( <FormComponent title="Hello Kulathunga"></FormComponent>).toJSON();
//     expect(tree).toMatchSnapshot();
// });
