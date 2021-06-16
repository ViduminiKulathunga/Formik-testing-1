import React, { Fragment, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik, useField } from "formik";
import { array, boolean, mixed, number, object, string } from "yup";
import { FormDetails, FormComponentProps } from "./FormDetails";

const initialValues: FormDetails = {
  name: "",
  age: 0,
  userCatergory: [],
  commentUserCatergory: "",
  dependents: -1,
  acceptTerms: false,
};

const FormComponent = (props: FormComponentProps) => {
  const [result, setResult] = useState("");

  let testingPrintValue =
    '{"name":"Vidumini","age":24, "commentUserCatergory":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}';

  return (
    <Fragment>
      <Formik
        validationSchema={object({
          name: string().required("Please enter name!").min(2).max(100),
          age: number().required().min(19).max(70),
          dependents: number().required().min(0).max(2),
          acceptTerms: boolean().oneOf([true]),
          userCatergory: array(string().oneOf(["High", "Medium", "Low"])).min(
            1
          ),
          commentUserCatergory: mixed().when("userCatergory", {
            is: (userCatergory: string[]) =>
              userCatergory.find((item) => item === "High"),
            then: string().required().min(20).max(100),
            otherwise: string().min(20).max(100),
          }),
        })}
        initialValues={initialValues}
        onSubmit={async (values, formikHelpers) => {
          setResult(JSON.stringify(values));
          console.log(values, " values");
          console.log(formikHelpers, " formikHelpers");
          console.log("---------------");
          console.log("result", result);
        }}
      >
        {({ values, errors, touched }) => (
          <div data-testid="formTesting">
            <Form>
              <FormGroup>
                <h1>{props.title}</h1>
              </FormGroup>
              <FormGroup>
                <Field name="name" as={TextField} label="Full Name" />
                <ErrorMessage name="name" />
                {/* {touched.name  && errors.name ? errors.name : null} */}
              </FormGroup>

              <FormGroup>
                <Field
                  name="age"
                  type="number"
                  id="age"
                  as={TextField}
                  label="age"
                />
                <ErrorMessage name="age" />
              </FormGroup>

              <FormGroup>
                <MyCheckBox name="userCatergory" value="High" label="High" />
                <MyCheckBox
                  name="userCatergory"
                  value="Medium"
                  label="Medium"
                />
                <MyCheckBox name="userCatergory" value="Low" label="Low" />
                <ErrorMessage name="userCatergory" />
              </FormGroup>

              <FormGroup>
                <Field
                  name="commentUserCatergory"
                  as={TextField}
                  // multiline
                  // row={3}
                  // rowsMax={10}
                  label="Comment Catergory"
                  data-testid="Comment-area"
                />
                <ErrorMessage name="commentUserCatergory" />
              </FormGroup>

              <FormGroup>
                <Field name="dependents" as={TextField} select>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                </Field>
                <ErrorMessage name="dependents" />
              </FormGroup>

              <FormGroup>
                <MyCheckBox name="acceptTerms" label="Accept Terms" />
                <ErrorMessage name="acceptTerms" />
              </FormGroup>

              <FormGroup>
                <button type="submit" name="submit">
                  Submit
                </button>
              </FormGroup>

              <pre>{JSON.stringify(errors, null, 4)}</pre>

              {/* Check current status of the form */}
              <pre>{JSON.stringify(values, null, 4)}</pre>

              <Field
                style={{ width: "100%" }}
                as="textarea"
                value={result}
                rows={2}
                name="result"
              />
            </Form>
          </div>
        )}
      </Formik>
      <div>{result}</div>
    </Fragment>
  );
};

export interface MyCheckBoxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckBox(props: MyCheckBoxProps) {
  const [field] = useField({
    name: props.name,
    type: "checkbox",
    value: props.value,
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}

export default FormComponent;
