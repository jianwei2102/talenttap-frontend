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
		<div className="bg-gray-200 h-full w-full absolute flex justify-center items-center">
			<div className="w-4/6 h-4/6 flex justify-center items-center">
				<div className="inherit h-full w-1/2 bg-white border rounded-l-md flex justify-center items-center">
					<form className="relative h-3/4 w-5/6 block" onSubmit={handleSubmit}>
						<span className="text-3xl font-bold text-black">Sign Up</span>
						<div className="block mt-10 h-1/6">
							<span className="text-lg text-black">E-mail address</span>
							<input
								className="mt-2 border border-gray-900 rounded-sm w-full h-1/2 p-2"
								type="text"
								name="email"
								onChange={handleChange}
								required></input>
						</div>
						<div className="block mt-5 h-1/6">
							<span className="text-lg text-black">Password</span>
							<input
								className="mt-2 border border-gray-900 rounded-sm w-full h-1/2 p-2"
								type="password"
								name="password"
								onChange={handleChange}
								required></input>
						</div>
						<div className="w-full mt-5 flex items-start">
							<input className="mt-1 h-full" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}></input>
							<span className="ml-2 text-sm">
								I have read and agreed to the {' '}
								<a href="https://cloudmails-my.sharepoint.com/:w:/g/personal/tp060751_mail_apu_edu_my/EYppO4IvYUlEmmXwNvz5ghkBd3qS3-Ia9_XtJwUgvGVq_Q" className="text-blue-500 hover:underline">
									terms and conditions
								</a>
							</span>
						</div>
						<button
							type="submit"
							disabled={!isChecked}
							className={`w-full h-10 mt-10 bg-red-700 flex justify-content items-center ${!isChecked ? 'opacity-50 cursor-not-allowed' : ''}`}>
							<span className="w-full text-center text-white cursor-pointer">Create Account</span>
						</button>
						<div className="mt-10 flex justify-center">
							<span>Already have an account?</span>
							<span className="text-red-700 ml-1 cursor-pointer" onClick={goToSignIn}>
								Sign in
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
						Create <br /> Account
					</span>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
