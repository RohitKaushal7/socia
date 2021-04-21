import React, { useRef } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useCreatePost } from "../../../../hooks/api/posts";

export default function CreatePost({ data, onCancel }) {
  const initialValues = data || {
    text: "",
  };
  const history = useHistory();

  const $form = useRef();
  const createPostMutation = useCreatePost();

  const handleCreatePost = (values) => {
    createPostMutation.mutate(values, {
      onSuccess: () => {
        $form.current.resetForm();
        setTimeout(() => {
          createPostMutation.reset();
          history.push("/profile");
        }, 2000);
      },
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleCreatePost}
        innerRef={$form}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4 flex flex-col">
              {/* <label className="text-gray-400">Text</label> */}
              <textarea
                type="text"
                placeholder="What's in your Mind..."
                name="text"
                onChange={handleChange}
                value={values.text}
                style={{ minHeight: "15rem" }}
                className="bg-transparent p-2 mb-2 border-b outline-none"
              />
              {errors.text && (
                <div className="error text-red-500 text-xs">{errors.text}</div>
              )}
            </div>

            <div className="actions flex justify-end mt-8">
              {/* <button className="px-4 py-2" type="button" onClick={onCancel}>
                Cancel
              </button> */}
              <button className="px-4 py-2 text-blue-400" type="submit">
                Post
              </button>
            </div>
          </form>
        )}
      </Formik>
      <div className="py-4">
        {createPostMutation.isSuccess && (
          <div className="text-green-400 text-center">
            Post Created Successfully
          </div>
        )}
        {createPostMutation.isError && (
          <div className="text-red-400 text-center">Some Error Occured</div>
        )}
      </div>
    </div>
  );
}
