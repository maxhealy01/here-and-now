export interface NoteType {
	_id: string;
	createdAt: string;
	latitude: number;
	longitude: number;
	text: string;
	username: string;
	comments: CommentType[];
}

export interface CommentType {
	_id: string;
	createdAt: string;
	text: string;
	username: string;
}
