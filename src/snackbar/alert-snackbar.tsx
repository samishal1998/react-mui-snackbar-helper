
import React, { CSSProperties, ReactNode } from "react";
import { Message } from "../data/message";
import { Alert, AlertColor, AlertProps, AlertTitle, AlertTitleProps, Snackbar, SnackbarCloseReason, SnackbarOrigin, SnackbarProps } from "@mui/material";

function compare(old: any, newObj: any) {
	const newKeys = Object.keys(newObj)
	const prevKeys = Object.keys(old)
	if (newKeys.length !== prevKeys.length) return false;
	for (const k of newKeys) {
		if (old[k] !== newObj[k]) return false;
	}
	return true;

}

export type AlertSnackbarCallback = (snackbar: AlertSnackbar, event: React.SyntheticEvent,) => void;
export type AlertSnackbarOnCloseCallback = (snackbar: AlertSnackbar, event: React.SyntheticEvent<any> | Event, reason: SnackbarCloseReason) => void

export type AlertSnackbarProps = {
	initiallyOpened?: boolean,
	onAlertClose?: AlertSnackbarCallback,
	onSnackbarClose: AlertSnackbarOnCloseCallback,
	title: ReactNode,
	message: ReactNode,
	severity: AlertColor,
	timeout: number | null,
	elevation: number,
	handleCloseAutomatically: boolean,
	alertTitleProps?: AlertTitleProps,
	snackbarProps?: Omit<SnackbarProps, 'open' | 'autoHideDuration' | 'onClose' | 'anchorOrigin'>,
	alertProps?: Omit<AlertProps, 'onClose' | 'severity' | 'elevation'>,
	snackbarAnchorOrigin: SnackbarOrigin
}
const _allowedUndefinedPropsKeys = ["onAlertClose", "alertTitleProps", "snackbarProps", "alertProps", "initiallyOpened"]

export type AlertSnackbarData = Omit<Partial<AlertSnackbarProps>, "initiallyOpened">

export type AlertSnackbarState =
	{
		opened: boolean
	} & AlertSnackbarProps

export default class AlertSnackbar extends React.Component<AlertSnackbarProps, AlertSnackbarState> {
	static defaultProps: AlertSnackbarProps = {
		title: "",
		message: '',
		handleCloseAutomatically: true,
		severity: 'success' as const,
		timeout: 3000,
		elevation: 10,
		snackbarAnchorOrigin: {
			vertical: "top",
			horizontal: "center"
		},
		onSnackbarClose: (snackbar: AlertSnackbar, _, __) => { snackbar.close() },
		onAlertClose: undefined, initiallyOpened: false

	}

	constructor(props: Readonly<AlertSnackbarProps> | AlertSnackbarProps) {
		super(props);
		this.state = {
			opened: Boolean(props.initiallyOpened),
			...props
		}
	}

	// static getDerivedStateFromProps(props:  Record<string,any>, state: Record<string,any>) {
	// 	for(const k in props){
	// 		if(props[k] !== state[k]){
	// 			return {...state,...props}
	// 		}
	// 	}
	// 	return null;
	// }
	componentDidUpdate(prevProps: Readonly<AlertSnackbarProps>, prevState: Readonly<AlertSnackbarState>, snapshot?: any): void {
		// console.log({ prevProps, newProps: this.props })
		if (!compare(prevProps, this.props)) {

			this.setState({ ...this.props })
		}
	}

	open = () => {
		this.setState({ opened: true })
		// setTimeout(() => {
		// 	this.close()
		// }, this.state.timeout)
	}
	close = () => {
		this.setState({ opened: false })
	}
	setOnAlertCloseCallback = (onAlertClose: AlertSnackbarProps['onAlertClose']) => {
		this.setState({ onAlertClose })
	}
	setOnSnackbarCloseCallback = (onSnackbarClose: AlertSnackbarProps['onSnackbarClose']) => {
		this.setState({ onSnackbarClose })
	}
	setSeverity = (severity: AlertSnackbarProps['severity']) => {
		this.setState({ severity })
	}
	setMessage = (message: AlertSnackbarProps['message']) => {
		this.setState({ message })
	}
	setTitle = (title: AlertSnackbarProps['title']) => {
		this.setState({ title })
	}
	setSnackbarAnchorOrigin = (snackbarAnchorOrigin: AlertSnackbarProps['snackbarAnchorOrigin']) => {
		this.setState({ snackbarAnchorOrigin })
	}
	setElevation = (elevation: AlertSnackbarProps['elevation']) => {
		this.setState({ elevation })
	}
	setAlertTitleProps = (alertTitleProps: AlertSnackbarProps['alertTitleProps']) => {
		this.setState({ alertTitleProps })
	}

	setSnackbarProps = (snackbarProps: AlertSnackbarProps['snackbarProps']) => {
		this.setState({ snackbarProps })
	}

	setAlertProps = (alertProps: AlertSnackbarProps['alertProps']) => {
		this.setState({ alertProps })
	}

	setAlertData = (data: AlertSnackbarData) => {
		const finalData = Object.fromEntries(
			Object.entries(data).filter(([key, value]) => ((value !== undefined) || (value === undefined && _allowedUndefinedPropsKeys.includes(key))))
		)
		this.setState((prev, props) => ({ ...finalData, opened: false, }))
	}
	setDataFromMessageObject(message: Message) {
		this.setState({
			severity: (!message.type) ? 'error' : message.type,
			title: message.title ?? '',
			message: message.message ?? '',
		})
	}

	render() {

		let { opened, onAlertClose, onSnackbarClose, handleCloseAutomatically, severity, timeout, message, title, elevation, alertTitleProps, alertProps, snackbarProps, snackbarAnchorOrigin } = this.state;

		return (
			<Snackbar
				{...(snackbarProps ?? {})}
				anchorOrigin={snackbarAnchorOrigin}
				open={opened}
				autoHideDuration={timeout}
				onClose={(e, r) => {
					onSnackbarClose(this, e, r)
					if (handleCloseAutomatically) {
						this.close()
					}
				}}
			>
				<Alert {...(alertProps ?? {})}
					severity={severity}
					onClose={
						(onAlertClose) ?
							(e) => { onAlertClose!(this, e); if (handleCloseAutomatically) this.close() }
							: undefined
					}
					elevation={elevation}>
					<AlertTitle {...(alertTitleProps ?? {})}>{Boolean(title) && <>{title}:</>}</AlertTitle>
					{Boolean(message) && message}
				</Alert>
			</Snackbar>
		);
	}
}


