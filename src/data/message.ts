export type MessageType = 'success' | 'info' | 'warning' | 'error';
export class Message {
	constructor(type: MessageType, title?: string, message?: string, description?: string, attachment?: any) {
		this.type = type;
		this.title = title;
		this.message = message;
		this.description = description;
		this.attachment = attachment;
	}

	type: MessageType = 'error';
	title?: string;
	message?: string;
	description?: string;
	attachment?: any;
	getText = () => {
		return this.title + '' + this.message;
	}
	static fromJSON = ({type, title, message, description, attachment}: { type: MessageType, title?: string, message?: string, description?: string, attachment?: any }) => {
		return new Message(type, title, message, description, attachment);
	}
}
