import React from "react";
import { Formik } from "formik";
import { getAuthToken } from "../../../../api-hooks/auth";
import { useAppContext } from "../../../../context/AppContext";

export default function SignInForm() {
  const { authToken, setAuthToken, setCurrentUser } = useAppContext();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setErrors, errors }) => {
        getAuthToken(values.email, values.password)
          .then((data) => {
            if (data.errors) {
              setErrors({ ...errors, ...data.errors });
              return;
            }
            let { token, user } = data;
            setCurrentUser(user);
            setAuthToken(token);
            localStorage.setItem(
              "authToken",
              JSON.stringify({
                token: token,
                exp: new Date().getTime() + 24 * 60 * 60 * 1000,
                user,
              })
            );
          })
          .catch((err) => {
            console.log(err.message);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="form flex flex-col items-center rounded bg-gray-300 p-10 shadow-md max-w-96 w-full"
        >
          <div className="text-2xl mb-8">Sign In</div>
          <div className="form-control flex flex-col  my-1 text-lg w-full">
            <label htmlFor="email" className="flex text-xs text-gray-700">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="flex w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <div className="err text-red-600 text-xs font-mono">
              {errors.email && touched.email && errors.email}
            </div>
          </div>
          <div className="form-control flex flex-col my-1 text-lg w-full">
            <label htmlFor="password" className="flex text-xs text-gray-700">
              password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="flex w-full"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <div className="err text-red-600 text-xs font-mono">
              {errors.password && touched.password && errors.password}
            </div>
          </div>
          <div className="actions mt-3">
            <button
              type="submit"
              className="w-full p-3 text-center text-blue-500 "
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
}
