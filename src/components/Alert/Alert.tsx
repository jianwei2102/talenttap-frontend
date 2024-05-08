import React, { useEffect } from "react";

export interface AlertProps {
	id?: string;
	containerClassName?: string;
	type?: "default" | "warning" | "info" | "success" | "error";
	message: React.ReactNode;
	timeout?: number;
	handleDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
	message = "Alert Text",
	containerClassName = "",
	type = "default",
	timeout = 0,
	handleDismiss = () => {},
}) => {
	useEffect(() => {
		if (timeout > 0 && handleDismiss) {
			const timer = setTimeout(() => {
				handleDismiss();
			}, timeout * 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	let classes = containerClassName;
	switch (type) {
		case "default":
			classes += "text-black bg-gray-300";
			break;
		case "info":
			classes += "bg-indigo-500 text-white";
			break;
		case "success":
			classes += "bg-green-700 text-white";
			break;
		case "warning":
			classes += "bg-yellow-500 text-white";
			break;
		case "error":
			classes += "bg-red-500 text-white";
			break;
		default:
			break;
	}

	return (
		<div
			className={`ttnc-alert relative flex items-center text-paragraph-base px-6 pt-4 pb-3 mb-5 rounded-lg ${classes}`}>
			<i className="pe-7s-info text-2xl mr-2"></i>
			{message}
		</div>
	);
};

export interface AlertWrapperProps {
	children: React.ReactNode;
}

export const AlertsWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="fixed top-0 right-0 p-4 z-50 pointer-events-none max-w-sm min-w-fit w-full">
			{children}
		</div>
	);
};
