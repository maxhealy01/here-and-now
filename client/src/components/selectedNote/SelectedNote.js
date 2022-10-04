import React, { useState } from "react";
import "./selectednote.css";
import { ObjectId } from "mongodb";
import TimeAgo from "timeago-react";

import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import { useEffect } from "react";

const SelectedNote = ({ selectedNote, setSelectedNote }) => {
	const note = selectedNote;
	const time = note.createdAt;

	const [comment, setComment] = useState("");
	const [comments, setComments] = useState(note.comments);

	// Set logic for displaying the Comments and input form
	const [openComments, setOpenComments] = useState(false);
	const buttonText = openComments
		? "Hide Comments"
		: `Show Comments ${comments.length}`;

	// Close the comments when the selected note changes
	useEffect(() => {
		setComments(selectedNote.comments);
		setOpenComments(false);
	}, [selectedNote]);

	return (
		<div className="selectedNote">
			<div className="noteHeader">
				<div className="noteHeaderItem">{note.username}</div>
				<TimeAgo className="noteHeaderItem" datetime={time} />
				<button
					className="ex-off noteHeaderItem"
					onClick={() => setSelectedNote("")}
				>
					X
				</button>
			</div>
			<div className="noteText">{note.text}</div>
			<div className="noteBottom">
				<button onClick={() => setOpenComments(!openComments)}>
					{buttonText}
				</button>
			</div>
			{openComments && (
				<div className="commentWindow">
					{comments.map((c, index) => {
						return <Comment c={c} index={index} />;
					})}
					<CommentForm
						comments={comments}
						setComments={setComments}
						comment={comment}
						setComment={setComment}
						noteId={note._id}
					/>
				</div>
			)}
		</div>
	);
};

export default SelectedNote;
