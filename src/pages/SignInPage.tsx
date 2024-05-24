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
		<div className="tw-bg-gray-200 tw-h-full tw-w-full tw-absolute tw-flex tw-justify-center tw-items-center">
			<div className="tw-w-full lg:tw-w-4/6 lg:tw-h-4/6 tw-flex tw-flex-col lg:tw-flex-row tw-justify-center tw-items-center">
				<div className="inherit tw-h-full tw-py-8 tw-w-5/6 lg:tw-w-1/2 tw-bg-white tw-border tw-rounded-l-md tw-flex tw-justify-center tw-items-center">
					<form className="tw-relative tw-h-3/4 tw-w-5/6 block" onSubmit={handleSubmit}>
						<span className="tw-text-3xl tw-font-bold tw-text-black">Log In</span>
						<div className="block tw-mt-10 tw-h-1/6">
							<span className="tw-text-lg tw-text-black">E-mail address</span>
							<input
								className="tw-mt-2 tw-border tw-border-gray-900 tw-rounded-sm tw-w-full tw-h-1/2 tw-p-2"
								type="text"
								name="email"
								required
								onChange={handleChange}></input>
						</div>
						<div className="block tw-mt-5 tw-h-1/6">
							<span className="tw-text-lg tw-text-black">Password</span>
							<input
								className="tw-mt-2 tw-border tw-border-gray-900 tw-rounded-sm tw-w-full tw-h-1/2 tw-p-2"
								type="password"
								name="password"
								required
								onChange={handleChange}></input>
						</div>
						<div className="tw-w-full tw-mt-5 tw-flex tw-items-center">
							<div className="tw-w-1/2 tw-flex tw-items-start">
								<input className="tw-mt-1 tw-h-full" type="checkbox"></input>
								<span className="tw-ml-2 tw-text-sm">Remember me</span>
							</div>
							<div className="tw-w-1/2 tw-flex tw-justify-end">
								<span className="tw-text-red-700 tw-text-right tw-text-sm tw-cursor-pointer">
									Forgot Password?
								</span>
							</div>
						</div>
						<button
							className="tw-w-full tw-h-10 tw-mt-10 tw-bg-red-700 tw-flex tw-justify-content tw-items-center tw-cursor-pointer"
							type="submit">
							<span className="tw-w-full tw-text-center tw-text-white">Sign In</span>
						</button>
						<div className="tw-mt-10 tw-flex tw-justify-center">
							<span>New here?</span>
							<span className="tw-text-red-700 tw-ml-1 tw-cursor-pointer" onClick={goToSignUp}>
								Create an account
							</span>
						</div>
					</form>
				</div>
				<div className="inherit tw-h-full tw-py-8 tw-w-5/6 lg:tw-w-1/2 tw-border tw-rounded-r-md tw-flex tw-justify-center tw-items-center tw-relative">
					<img
						className="inherit tw-h-full tw-w-full tw-object-fill tw-border tw-rounded-r-md tw-z-0 tw-absolute"
						src={require("../assets/wave-background.png")}
						alt="login background"></img>
					<span className="tw-text-5xl tw-text-center tw-font-bold tw-text-white tw-z-10">
						Welcome <br /> Back
					</span>
				</div>
			</div>
		</div>
	);
}

export default SignIn;
