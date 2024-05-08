import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/UserReducer.tsx";
import { AlertsContext } from "../components/AlertContext.tsx";
import { AuthAPI } from "../api/authAPI.ts";
import User from "../models/User.ts";

function SignIn() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const { addAlert } = useContext(AlertsContext);

	const goToSignUp = () => {
		navigate("/signup");
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const goToAdminDashboard = () => {
		navigate("/admin");
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		try {
			const response = await AuthAPI.login(formData.email, formData.password);
			const { access, refresh, user } = response;

			console.log(response);

			localStorage.setItem("access", access);
			localStorage.setItem("refresh", refresh);
			localStorage.setItem("user", JSON.stringify(user));

			// add the below userModel to global state after state management is implemented
			const userModel = User.fromJson(user);

			navigate("/profile", { replace: true });
			addAlert({ type: "success", message: "Signed In Successfully", timeout: 5 });
			dispatch(login(formData.email));
		} catch (error: any) {
			console.log(error);

			addAlert({ type: "error", message: error.response.data.message, timeout: 5 });
		}
	};

	return (
		<div className="bg-slate-200 h-full w-full absolute flex justify-center items-center">
			<div className="w-4/6 h-4/6 flex justify-center items-center">
				<div className="inherit h-full w-1/2 bg-white border rounded-l-md flex justify-center items-center">
					<form className="relative h-3/4 w-5/6 block" onSubmit={handleSubmit}>
						<span className="text-3xl font-bold text-black">Log In</span>
						<div className="block mt-10 h-1/6">
							<span className="text-lg text-black">E-mail address</span>
							<input
								className="mt-2 border border-gray-900 rounded-sm w-full h-1/2 p-2"
								type="text"
								name="email"
								required
								onChange={handleChange}></input>
						</div>
						<div className="block mt-5 h-1/6">
							<span className="text-lg text-black">Password</span>
							<input
								className="mt-2 border border-gray-900 rounded-sm w-full h-1/2 p-2"
								type="password"
								name="password"
								required
								onChange={handleChange}></input>
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
						<button
							className="w-full h-10 mt-10 bg-red-700 flex justify-content items-center cursor-pointer"
							type="submit">
							<span className="w-full text-center text-white">Sign In</span>
						</button>
						<div className="mt-10 flex justify-center">
							<span>New here?</span>
							<span className="text-red-700 ml-1 cursor-pointer" onClick={goToSignUp}>
								Create an account
							</span>
						</div>
					</form>
				</div>
				<div className="inherit h-full w-1/2 border rounded-r-md flex justify-center items-center relative">
					<img
						className="inherit h-full w-full object-fill border rounded-r-md z-0 absolute"
						src={require("../assets/wave-background.png")}
						alt="login background"></img>
					<span className="text-5xl text-center font-bold text-white z-10">
						Welcome <br /> Back
					</span>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
