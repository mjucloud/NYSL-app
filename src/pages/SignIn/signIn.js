import React from "react";
import { UserAuth } from "../MessageBoard/chat-auth";
import { GoogleButton } from "react-google-button";
import './sigIn.css';

export const SignIn = () => {
  const { googleSignIn, user, logOut } = UserAuth();
  

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-8">Sign in</h1>
      {user ? (
        <>
          <p className="text-green-500 text-center">
            Successfully Signed In!
          </p>
          <button className="my-4 mx-auto block signInButton" onClick={handleSignOut}>
            Log Out
          </button>
        </>
      ) : (
        <div className="max-w-[240px] m-auto py-4 signInButton">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      )}
    </div>
  );
};


/*   const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }
 */