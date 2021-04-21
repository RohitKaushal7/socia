import { Formik } from "formik";
import React, { useEffect } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { useGetUser, useUpdateUser } from "../../../../hooks/api/users";

export default function EditProfile({ onCancel }) {
  // CONSTANTS
  const { currentUser } = useAppContext();
  const userQuery = useGetUser({ userId: currentUser.id });
  const user = userQuery.data?.users[0];

  const updateUserMutation = useUpdateUser();

  const initialValues = {
    name: user.name || "",
    bio: user.bio || "",
    profilePictureUrl: user.profilePictureUrl || "",
  };

  //EFFECTS
  useEffect(() => {
    if (updateUserMutation.isSuccess) {
      onCancel();
    }
  }, [updateUserMutation.isSuccess]);

  // FUNCTIONS

  const handleSubmit = (values) => {
    updateUserMutation.mutate({ data: values });
  };

  // RENDER
  return user ? (
    <div className="edit-profile m-auto max-w-4xl p-8 bg-gray-700 bg-opacity-50 rounded-xl">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-4 flex flex-col">
              <label className="text-gray-400">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                onChange={handleChange}
                value={values.name}
                className="bg-transparent p-2 mb-2 border-b outline-none"
              />
              {errors.name && (
                <div className="error text-red-500 text-xs">{errors.name}</div>
              )}
            </div>
            <div className="form-group my-4 flex flex-col">
              <label className="text-gray-400">Bio</label>
              <textarea
                type="text"
                placeholder="About You"
                name="bio"
                onChange={handleChange}
                value={values.bio}
                className="bg-transparent p-2 mb-2 border-b outline-none"
              />
              {errors.bio && (
                <div className="error text-red-500 text-xs">{errors.bio}</div>
              )}
            </div>
            <div className="form-group my-4 flex flex-col">
              <label className="text-gray-400">Profile Picture Url</label>
              <input
                type="text"
                placeholder="link of the picture for your dp"
                name="profilePictureUrl"
                onChange={handleChange}
                value={values.profilePictureUrl}
                className="bg-transparent p-2 mb-2 border-b outline-none"
              />
              {errors.profilePictureUrl && (
                <div className="error text-red-500 text-xs">
                  {errors.profilePictureUrl}
                </div>
              )}
            </div>

            <div className="actions flex justify-end mt-8">
              <button className="px-4 py-2" type="button" onClick={onCancel}>
                Cancel
              </button>
              <button className="px-4 py-2 text-blue-400" type="submit">
                Save
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  ) : null;
}
