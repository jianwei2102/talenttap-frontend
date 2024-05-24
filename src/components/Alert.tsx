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
			classes += "tw-text-black tw-bg-gray-300";
			break;
		case "info":
			classes += "tw-bg-indigo-500 tw-text-white";
			break;
		case "success":
			classes += "tw-bg-green-700 tw-text-white";
			break;
		case "warning":
			classes += "tw-bg-yellow-500 tw-text-white";
			break;
		case "error":
			classes += "tw-bg-red-500 tw-text-white";
			break;
		default:
			break;
	}

	return (
		<div
			className={`ttnc-alert tw-relative tw-flex tw-items-center tw-text-paragraph-base tw-px-6 tw-pt-4 tw-pb-3 tw-mb-5 tw-rounded-lg ${classes}`}>
			<i className="tw-pe-7s-info tw-text-2xl tw-mr-2"></i>
			{message}
		</div>
	);
};

export interface AlertWrapperProps {
	children: React.ReactNode;
}

export const AlertsWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="tw-fixed tw-top-0 tw-right-0 tw-p-4 tw-z-50 tw-pointer-events-none tw-max-w-sm tw-min-w-fit tw-w-full">
			{children}
		</div>
	);
};
