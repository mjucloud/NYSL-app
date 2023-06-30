import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import { UserAuth } from "./MessageBoard/chat-auth";
import { GoogleButton } from 'react-google-button';

export const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1 className='text-center text-3xl font-bold py-8'  >Sign in</h1>
      <div className='max-w-[240px] m-auto py-4'>
        <GoogleButton onClick={handleGoogleSignIn}/>
      </div>
    </div>
  );
};