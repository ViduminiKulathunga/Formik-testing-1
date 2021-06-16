import React, { Fragment } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { FormDetails } from "./FormDetails";

const initialValues: FormDetails = {
  name: "",
  age: 0,
  userCatergory: [],
  commentUserCatergory: "",
  dependents: -1,
  acceptTerms: false,
};

const FormComponent = () => {
  return (
    <Fragment>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values }) => (
          <Form>
            <Field name="name" />
            <Field name="age" type="number" />
            <Field name="userCatergory" value="High" type="checkbox" />
            <Field name="userCatergory" value="Medium" type="checkbox" />
            <Field name="userCatergory" value="Low" type="checkbox" />
            <Field name="commentUserCatergory" as="textarea" />
            <Field name="dependents" as="select">
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Field>
            <Field name="acceptTerms" type="checkbox" />
            {/* Check current status of the form */}
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default FormComponent;
