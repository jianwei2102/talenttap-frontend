import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../api/authAPI.ts";
import { AlertsContext } from "../components/AlertContext.tsx";

function SignUp() {
	const navigate = useNavigate();
	const { addAlert } = useContext(AlertsContext);
	const [formData, setFormData] = useState({ email: "", password: "" });

	const goToSignIn = () => {
		navigate("/login");
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const email = formData.email;
		const password = formData.password;

		try {
			const success = await AuthAPI.register(email, password);

			// redirect to home page
			if (success) {
				addAlert({
					type: "success",
					message: "Signed Up Successfully. Please sign in now.",
					timeout: 5,
				});

				console.log("Signed Up Successfully. Please sign in now.");

				navigate("/login");
			}
		} catch (error: any) {
			addAlert({ type: "error", message: error.response.data.detail, timeout: 5 });
		}
	};

	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = (event) => {
	  setIsChecked(event.target.checked);
	};

	return (
		<div className="tw-bg-gray-200 tw-h-full tw-w-full tw-absolute tw-flex tw-justify-center tw-items-center">
			<div className="tw-w-4/6 tw-h-4/6 tw-flex tw-justify-center tw-items-center">
				<div className="inherit tw-h-full tw-w-1/2 tw-bg-white tw-border tw-rounded-l-md tw-flex tw-justify-center tw-items-center">
					<form className="tw-relative tw-h-3/4 tw-w-5/6 block" onSubmit={handleSubmit}>
						<span className="tw-text-3xl tw-font-bold tw-text-black">Sign Up</span>
						<div className="block tw-mt-10 tw-h-1/6">
							<span className="tw-text-lg tw-text-black">E-mail address</span>
							<input
								className="tw-mt-2 tw-border tw-border-gray-900 tw-rounded-sm tw-w-full tw-h-1/2 tw-p-2"
								type="text"
								name="email"
								onChange={handleChange}
								required></input>
						</div>
						<div className="block tw-mt-5 tw-h-1/6">
							<span className="tw-text-lg tw-text-black">Password</span>
							<input
								className="tw-mt-2 tw-border tw-border-gray-900 tw-rounded-sm tw-w-full tw-h-1/2 tw-p-2"
								type="password"
								name="password"
								onChange={handleChange}
								required></input>
						</div>
						<div className="tw-w-full tw-mt-5 tw-flex tw-items-start">
							<input className="tw-mt-1 tw-h-full" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
							<span className="tw-ml-2 tw-text-sm">
								I have read and agreed to the {' '}
								<a href="https://cloudmails-my.sharepoint.com/:w:/g/personal/tp060751_mail_apu_edu_my/EYppO4IvYUlEmmXwNvz5ghkBd3qS3-Ia9_XtJwUgvGVq_Q" className="tw-text-blue-500 hover:underline">
									terms and conditions
								</a>
							</span>
						</div>
						<button
							type="submit"
							disabled={!isChecked}
							className={`tw-w-full tw-h-10 tw-mt-10 tw-bg-red-700 tw-flex tw-justify-content tw-items-center ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}>
							<span className="tw-w-full tw-text-center tw-text-white tw-cursor-pointer">Create Account</span>
						</button>
						<div className="tw-mt-10 tw-flex tw-justify-center">
							<span>Already have an account?</span>
							<span className="tw-text-red-700 tw-ml-1 tw-cursor-pointer" onClick={goToSignIn}>
								Sign in
							</span>
						</div>
					</form>
				</div>
				<div className="inherit tw-h-full tw-w-1/2 tw-border tw-rounded-r-md tw-flex tw-justify-center tw-items-center tw-relative">
					<img
						className="inherit tw-h-full tw-w-full tw-object-fill tw-border tw-rounded-r-md tw-z-0 tw-absolute"
						src={require("../assets/wave-background.png")}
						alt="login background"></img>
					<span className="tw-text-5xl tw-text-center tw-font-bold tw-text-white tw-z-10">
						Create <br /> Account
					</span>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
