import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

import { CommentType as Comment, NoteType as Note } from "../../utils/typeDefs";

import "./CommentForm.css";

interface CommentFormProps {
	setComments: (comments: Comment[]) => void;
	selectedNote: Note;
	comment: string;
	setComment: (comment: string) => void;
}
const CommentForm: React.FC<CommentFormProps> = ({
	setComments,
	selectedNote,
	comment,
	setComment,
}) => {
	// Create logic for adding a comment to the note
	const [newComment] = useMutation(ADD_COMMENT);

	const handleCommentSubmit: React.MouseEventHandler<
		HTMLButtonElement
	> = async (e) => {
		e.preventDefault();

		let updatedNote = await newComment({
			variables: {
				text: comment,
				noteId: selectedNote._id,
			},
		});
		setComment("");
		setComments(updatedNote.data.addComment.comments);
	};

	return (
		<>
			<div className="commentForm center">
				<div>
					<textarea
						className="commentInput"
						placeholder="Leave a comment!"
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
				</div>
				<div>
					<button className="commentSubmitButton" onClick={handleCommentSubmit}>
						Post
					</button>
				</div>
			</div>
		</>
	);
};

export default CommentForm;
