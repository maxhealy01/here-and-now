import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_COMMENT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

import "./CommentForm.css";

const CommentForm = ({
	comment,
	comments,
	setComment,
	setComments,
	noteId,
}) => {
	// Set the username, so that when the comments are refreshed they will show the proper username.
	const [userId, setId] = useState("anonymous");
	const { data } = useQuery(QUERY_ME, {
		onCompleted: () => setId(data.me.username),
	});

	// Create logic for adding a comment to the note
	const [newComment] = useMutation(ADD_COMMENT);

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		const c = {
			username: userId,
			text: comment,
			noteId: noteId,
		};
		newComment({
			variables: {
				text: comment,
				noteId: noteId,
			},
		});
		setComments([...comments, c]);
		setComment("");
	};

	return (
		<>
			<div className="commentForm">
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
