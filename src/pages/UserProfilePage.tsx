import React from "react";
import UserNavBar from "../components/UserNavBar.tsx";

function UserProfilePage() {
  return (
    <div className="h-screen w-screen absolute flex flex-col">
      <UserNavBar activeIndex={1} />
      <div className="w-full relative flex flex-col items-center p-10 overscroll-auto">
        <div className="w-3/4 h-auto shadow-lg overflow-visible">
          <div className="w-full h-20 relative">
            <img
              className="h-full w-full absolute object-cover z-0"
              src={require("../assets/login-wave-background.png")}
              alt="Background"></img>
            <div className="h-full w-full absolute flex justify-between z-10">
              <div className="z-10 flex flex-col ml-10 justify-center">
                <span className="text-white font-bold text-3xl">Profile</span>
                <span className="text-white text-xl">
                  Settings for your personal profile
                </span>
              </div>
              <div className="z-10 flex items-center mr-10">
                <button className="bg-white border rounded-sm p-2">
                  <span className="text-red-800">Save Changes</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full pt-5 pb-5 relative flex flex-col justify-center">
            <div className="pl-10 pr-10 pt-5 pb-5">
              <span className="text-lg text-black">Full Name</span>
              <input
                className="w-full h-10 p-2 border border-black rounded mt-1.5"
                type="text"></input>
            </div>
            <div className="pl-10 pr-10 pt-5 pb-5">
              <span className="text-lg text-black">Email Address</span>
              <input
                className="w-full h-10 p-2 border border-black rounded mt-1.5"
                type="text"></input>
            </div>
            <div className="flex justify-between">
              <div className="w-full block flex flex-col pl-10 pr-10 pt-5 pb-5">
                <span className="text-lg text-black">Contact Number</span>
                <input
                  className="w-full h-10 p-2 border border-black rounded mt-1.5"
                  type="text"></input>
              </div>
              <div className="w-full block flex flex-col pl-10 pr-10 pt-5 pb-5">
                <span className="text-lg text-black">Location</span>
                <input
                  className="w-full h-10 p-2 border border-black rounded mt-1.5"
                  type="text"></input>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 shadow-lg mt-10">
          <div className="w-full h-20 relative">
            <img
              className="h-full w-full absolute object-cover z-0"
              src={require("../assets/login-wave-background.png")}
              alt="Background"></img>
            <div className="h-full w-full absolute flex justify-between z-10">
              <div className="z-10 flex flex-col ml-10 justify-center">
                <span className="text-white font-bold text-3xl">
                  Danger Zone
                </span>
                <span className="text-white text-xl">Delete user account</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-5 pb-5 pl-10 pr-10">
            <span className="text-left">
              By deleting your account you will lose all your data
            </span>
            <button className="w-1/4 bg-red-700 border rounded-sm p-2 mt-2">
              <span className="text-white">Request account deletion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
