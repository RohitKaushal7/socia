import React from "react";
import { useAppContext } from "../../context/AppContext";

export default function Profile() {
  const {
    authToken,
    currentUser,
    setCurrentUser,
    setAuthToken,
  } = useAppContext();

  const logOut = () => {
    setCurrentUser(null);
    setAuthToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <div className="bg-gray-800">
      <div className="container min-h-screen m-auto max-w-6xl">
        <header className="p-4 py-8 flex justify-between items-center">
          <div className="user flex items-center justify-between">
            <div className="pic w-20 h-20 rounded-full bg-gray-500"></div>
            <div className="info ml-5 text-white">
              <div className="name"></div>
              <div className="email text-gray-400">{currentUser?.email}</div>
            </div>
          </div>
          <div className="actions text-red-400">
            <button onClick={logOut}>Logout</button>
          </div>
        </header>
      </div>
    </div>
  );
}
