import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default function Home() {
  const {
    setAuthToken,
    setCurrentUser,
    currentUser,
    authToken,
  } = useAppContext();

  // FUNCTIONS
  useEffect(() => {
    const r = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(10), 1000);
      })
        .then((data) => {
          console.log("inner then ", data);
          throw new Error("inner catch will handle this");
          return 15;
        })
        .catch((err) => {
          console.log("inner catch block", err);
          throw new Error("this will go in outer catch");
          return 20;
        });
    };

    r()
      .then((data) => {
        console.log("outer then ", data);
      })
      .catch((err) => {
        console.log("outer catch block", err);
      });
  }, []);

  //RENDER

  return (
    <div>
      <div className="container max-w-6xl m-auto">
        <div className="text-3xl">Home</div>
      </div>
    </div>
  );
}
