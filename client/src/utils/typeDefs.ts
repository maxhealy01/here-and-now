import { Types } from "mongoose";

export interface NoteType {
	createdAt: string;
	latitude: number;
	longitude: number;
	text: string;
	username: string;
	comments: CommentType[];
}

export interface CommentType {
	createdAt: string;
	text: string;
	username: string;
}
