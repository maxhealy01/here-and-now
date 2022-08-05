import React, { useState } from "react";
import "./selectednote.css";
import { ObjectId } from "mongodb";
import TimeAgo from "timeago-react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COMMENT } from "../../utils/mutations";

import Comment from "../comment/Comment";

const SelectedNote = ({ selectedNote, setSelectedNote }) => {
	const note = selectedNote;
	const time = ObjectId(note._id).getTimestamp();

	// Set logic for displaying the Comments and input form
	const [openComments, setOpenComments] = useState(false);

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
				{/* <button
					className="ex-off noteHeaderItem"
					onClick={() => setSelectedNote("")}
				>
					X
				</button> */}
			</div>
			<div className="noteText">{note.text}</div>
			<div className="noteBottom">
				<button onClick={() => setOpenComments(!openComments)}>
					Comments ({note.comments.length})
				</button>
			</div>
			{openComments && (
				<div className="commentWindow">
					{note.comments.map((c, index) => {
						return <Comment c={c} index={index} />;
					})}
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
