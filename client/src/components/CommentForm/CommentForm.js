import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

import "./CommentForm.css";

const CommentForm = ({ setComments, selectedNote, comment, setComment }) => {
	// Create logic for adding a comment to the note
	const [newComment] = useMutation(ADD_COMMENT);

	const handleCommentSubmit = async (e) => {
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
