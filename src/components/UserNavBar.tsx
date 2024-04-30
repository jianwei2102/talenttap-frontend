import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";

interface UserNavBarProps {
  activeIndex: number;
}

const UserNavBar = ({ activeIndex }: UserNavBarProps) => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/home");
    activeIndex = 0;
  };

  const goToProfilePage = () => {
    navigate("/profile");
    activeIndex = 1;
  };

  const goToFeedbackPage = () => {
    navigate("/feedback");
    activeIndex = 2;
  };

  const goToLoginPage = () => {
    navigate("/login");
    activeIndex = 3;
  };

  return (
    <div className="w-full h-10 relative fixed flex items-center">
      <div className="h-full w-1/6 flex justify-center items-center">
        <img
          className="h-5/6 w-5/6 object-cover"
          src={require("../assets/hilti-logo.png")}
          alt="HILTI Logo"></img>
      </div>
      <div className="flex flex-row-reverse items-center h-full w-5/6">
        <div
          className={
            activeIndex === 3
              ? "nav-item nav-item-active mr-20"
              : "nav-item mr-20"
          } onClick={goToLoginPage}>
          Logout
        </div>
        <div
          className={
            activeIndex === 2 ? "nav-item nav-item-active" : "nav-item"
          } onClick={goToFeedbackPage}>
          Feedback
        </div>
        <div
          className={
            activeIndex === 1 ? "nav-item nav-item-active" : "nav-item"
          } onClick={goToProfilePage}>
          Profile
        </div>
        <div
          className={
            activeIndex === 0 ? "nav-item nav-item-active" : "nav-item"
          } onClick={goToHomePage}>
          Home
        </div>
      </div>
    </div>
  );
};

export default UserNavBar;
