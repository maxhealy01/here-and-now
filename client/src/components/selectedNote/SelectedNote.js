import React, { useState } from "react";
import "./selectednote.css";
import { ObjectId } from "mongodb";
import TimeAgo from "timeago-react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COMMENT } from "../../utils/mutations";

const SelectedNote = (selectedNote) => {
	const note = selectedNote.selectedNote;
	const time = ObjectId(note._id).getTimestamp();

	// Set logic for displaying either the Comment or Message input depending on the button clicked
	const [openWindow, setOpenWindow] = useState("");

	const [userId, setId] = useState("");

	// Create logic for adding a comment to the note
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState(note.comments);

	const [newComment] = useMutation(ADD_COMMENT);

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		const c = {
			username: userId,
			text: comment,
			noteId: note._id,
		};
		newComment({
			variables: {
				text: comment,
				noteId: note._id,
			},
		});
		setComments([...comments, c]);
		setComment("");
	};

	return (
		<div className="selectedNote">
			<div className="noteHeader">
				<div className="noteHeaderItem">{note.username}</div>
				<TimeAgo className="noteHeaderItem" datetime={time} />
			</div>
			<div className="noteText">{note.text}</div>
			<div className="noteBottom">
				<button onClick={() => setOpenWindow("comment")}>
					Comments ({note.comments.length})
				</button>
			</div>
			{openWindow === "comment" && (
				<div className="commentWindow">
					{note.comments.map((c) => (
						<div className="commentBody">
							<div className="commentTop">
								<div className="commentUsername">{c.username}</div>
							</div>
							<div className="commentText">{c.text}</div>
						</div>
					))}
					<textarea
						className="commentInput"
						placeholder="Leave a comment!"
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
					<button className="commentSubmitButton" onClick={handleCommentSubmit}>
						Post
					</button>
				</div>
			)}
		</div>
	);
};

export default SelectedNote;
