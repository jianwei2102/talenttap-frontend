import { createContext, useState } from "react";
import { Alert, AlertProps, AlertsWrapper } from "./Alert.tsx";
import React from "react";

export const AlertsContext = createContext<any>(null);
export const AlertsProvider = ({ children }: { children: React.ReactNode }) => {
	const [alerts, setAlerts] = useState<AlertProps[]>([]);

	const addAlert = (alert: AlertProps) => {
		const id = Math.random().toString(36).slice(2, 9) + new Date().getTime().toString(36);
		setAlerts((prev) => [{ ...alert, id: id }, ...prev]);
		return id;
	};

	const dismissAlert = (id: string) => {
		setAlerts((prev) => prev.filter((alert) => alert.id !== id));
	};

	return (
		<AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
			<AlertsWrapper>
				{alerts.map((alert: AlertProps) => (
					<Alert
						key={alert.id}
						{...alert}
						handleDismiss={() => {
							dismissAlert(alert.id || "");
						}}
					/>
				))}
			</AlertsWrapper>
			{children}
		</AlertsContext.Provider>
	);
};
