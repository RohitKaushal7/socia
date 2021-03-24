import React from "react";
import { useAppContext } from "../../context/AppContext";

export default function Home() {
  const {
    setAuthToken,
    setCurrentUser,
    currentUser,
    authToken,
  } = useAppContext();

  // FUNCTIONS

  //RENDER

  return (
    <div>
      <div className="container max-w-6xl m-auto">
        <div className="text-3xl">Home</div>
      </div>
    </div>
  );
}
