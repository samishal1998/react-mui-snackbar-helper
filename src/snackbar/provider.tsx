import React, { createRef, RefObject, useCallback, useMemo, ReactNode, useRef } from "react";
import AlertSnackBar, { AlertSnackbarData,AlertSnackbarProps } from "./alert-snackbar";


export type ShowMessageMethod = (severity: AlertSnackbarData['severity'], message: AlertSnackbarData['message'], title?: AlertSnackbarData['title'], timeout?: AlertSnackbarData['timeout']) => void
export type ShowMessageSubMethod = (message: AlertSnackbarData['message'], title?: AlertSnackbarData['title'], timeout?: AlertSnackbarData['timeout']) => void
const SnackbarContext = React.createContext<SnackbarContextType>({
	showSuccessMessage: () => {
	},
	showErrorMessage: () => {
	},
	showInfoMessage: () => {
	},
	showWarningMessage: () => {
	},
});
export type SnackbarContextType = {
	snackbarRef?: RefObject<AlertSnackBar>,
	showSuccessMessage: ShowMessageSubMethod,
	showErrorMessage: ShowMessageSubMethod,
	showInfoMessage: ShowMessageSubMethod,
	showWarningMessage: ShowMessageSubMethod,
}

const SnackbarProvider = ({ children, ...snackbarProps }: { children: ReactNode } & Partial<AlertSnackbarProps>) => {
	const snackbarRef = useRef<AlertSnackBar | null>(null);

	const showMessage: ShowMessageMethod = useCallback((severity, message, title?, timeout = 5000) => {
		snackbarRef.current?.setAlertData(
			{
				severity,
				message: (message)?`${message}`: "",
				timeout,
				title,
			}
		)
		snackbarRef.current?.open()
	}, [snackbarRef])

	const showSuccessMessage: ShowMessageSubMethod = useCallback((message, title?, timeout = 5000) => {
		showMessage('success', message, title, timeout);
	}, [showMessage])

	const showErrorMessage: ShowMessageSubMethod = useCallback((message, title?, timeout = 5000) => {
		showMessage('error', message, title, timeout);
	}, [showMessage])

	const showInfoMessage: ShowMessageSubMethod = useCallback((message, title?, timeout = 5000) => {
		showMessage('info', message, title, timeout);
	}, [showMessage])

	const showWarningMessage: ShowMessageSubMethod = useCallback((message, title?, timeout = 5000) => {
		showMessage('warning', message, title, timeout);
	}, [showMessage])

	const providerValue: SnackbarContextType = useMemo(() => ({ snackbarRef, showSuccessMessage, showErrorMessage, showInfoMessage, showWarningMessage }), [snackbarRef, showSuccessMessage, showErrorMessage, showInfoMessage, showWarningMessage])
	return (

		<SnackbarContext.Provider value={providerValue}>
			{children}
			<AlertSnackBar {...(snackbarProps)} ref={snackbarRef} />
		</SnackbarContext.Provider>
	);

}

function useSnackbar() {
	const context = React.useContext(SnackbarContext)
	if (!context) {
		throw new Error(
			`Snackbar cannot be used outside the SnackbarContext`,
		)
	}
	return context
}

export default SnackbarProvider;
export { useSnackbar, SnackbarProvider }
export const SnackbarConsumer = SnackbarContext.Consumer
