import React from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate('/profile');
  }

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="bg-slate-200 h-full w-full absolute flex justify-center items-center">
      <div className="w-4/6 h-4/6 flex justify-center items-center">
        <div className="inherit h-full w-1/2 bg-white border rounded-l-md flex justify-center items-center">
          <div className="relative h-3/4 w-5/6 block">
            <span className="text-3xl font-bold text-black">Log In</span>
            <div className="block mt-10 h-1/6">
              <span className="text-lg text-black">E-mail address</span>
              <input
                className="mt-2 border border-gray-900 rounded-sm w-full h-1/2 p-2"
                type="text"
              ></input>
            </div>
            <div className="block mt-5 h-1/6">
              <span className="text-lg text-black">Password</span>
              <input
                className="mt-2 border border-gray-900 rounded-sm w-full h-1/2 p-2"
                type="text"
              ></input>
            </div>
            <div className="w-full mt-5 flex items-center">
              <div className="w-1/2 flex items-start">
                <input className="mt-1 h-full" type="checkbox"></input>
                <span className="ml-2 text-sm">Remember me</span>
              </div>
              <div className="w-1/2 flex justify-end">
                <span className="text-red-700 text-right text-sm cursor-pointer">
                  Forgot Password?
                </span>
              </div>
            </div>
            <div className="w-full h-10 mt-10 bg-red-700 flex justify-content items-center cursor-pointer">
              <span className="w-full text-center text-white" onClick={goToProfilePage}>Sign In</span>
            </div>
            <div className="mt-10 flex justify-center">
              <span>New here?</span>
              <span className="text-red-700 ml-1 cursor-pointer" onClick={goToSignUp}>Create an account</span>
            </div>
          </div>
        </div>
        <div className="inherit h-full w-1/2 border rounded-r-md flex justify-center items-center relative">
          <img
            className="inherit h-full w-full object-fill border rounded-r-md z-0 absolute"
            src={require("../assets/login-wave-background.png")}
            alt="login background"
          ></img>
          <span className="text-5xl text-center font-bold text-white z-10">
            Create <br /> Account
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
