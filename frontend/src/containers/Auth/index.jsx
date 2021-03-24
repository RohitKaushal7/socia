import React, { useEffect, useState } from "react";
import "./Auth.scss";
import SignInForm from "../../components/organisms/Auth/SignInForm/SignInForm";
import SignUpForm from "../../components/organisms/Auth/SignInForm/SignUpForm";

export default function Auth() {
  const [signUp, setSignUp] = useState(false);
  // EFFECTS

  // FUNCTIONS

  // RENDER
  return (
    <div className="loginPage bg-gray-800">
      <div className="flex flex-col justify-center items-center w-full h-screen max-w-md m-auto">
        {signUp ? <SignUpForm /> : <SignInForm />}
        <div className="text-mono text-white text-xs p-2">
          {signUp ? (
            <div>
              already have an account ?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setSignUp(false)}
              >
                Login
              </span>
            </div>
          ) : (
            <div>
              don't have an account ?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setSignUp(true)}
              >
                Create an Account
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
