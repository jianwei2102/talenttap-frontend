import "../App.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AlertsContext } from "./AlertContext.tsx";

interface UserNavBarProps {
	activeIndex: number;
}

const UserNavBar = ({ activeIndex }: UserNavBarProps) => {
	const navigate = useNavigate();
  
	const { addAlert } = useContext(AlertsContext);

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

	const logout = () => {
		localStorage.removeItem("access");
		localStorage.removeItem("refresh");
		localStorage.removeItem("user");
		navigate("/login");
		addAlert({
			type: "success",
			message: "Logged out successfully",
			timeout: 5,
		});
	};

	return (
		<div className="w-full h-20 relative fixed flex items-center z-1">
			<div className="h-full w-1/6 flex justify-center items-center">
				<img
					className="h-5/6 w-5/6 object-contain"
					src={require("../assets/hilti-logo.png")}
					alt="HILTI Logo"></img>
			</div>
			<div className="flex flex-row-reverse items-center h-full w-5/6">
				<div
					className={activeIndex === 3 ? "nav-item nav-item-active mr-20" : "nav-item mr-20"}
					onClick={logout}>
					Logout
				</div>
				<div
					className={activeIndex === 2 ? "nav-item nav-item-active" : "nav-item"}
					onClick={goToFeedbackPage}>
					Feedback
				</div>
				<div
					className={activeIndex === 1 ? "nav-item nav-item-active" : "nav-item"}
					onClick={goToProfilePage}>
					Profile
				</div>
				<div
					className={activeIndex === 0 ? "nav-item nav-item-active" : "nav-item"}
					onClick={goToHomePage}>
					Home
				</div>
			</div>
		</div>
	);
};

export default UserNavBar;
