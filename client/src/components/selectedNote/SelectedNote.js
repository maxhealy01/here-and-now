import React, { useState } from "react";
import "./selectednote.css";
import TimeAgo from "timeago-react";

import Comment from "../Comment/Comment";
import CommentForm from "../CommentForm/CommentForm";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const SelectedNote = ({ selectedNote, setSelectedNote }) => {
	const note = selectedNote;
	const time = note.createdAt;

	const [comment, setComment] = useState("");
	const [comments, setComments] = useState(note.comments);

	// Set logic for displaying the Comments and input form
	const [openComments, setOpenComments] = useState(false);

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
			<ReactQuill
				className="no-border"
				readOnly={true}
				value={note.text}
				theme={"bubble"}
				disable
			/>
			<div className="noteBottom">
				<button onClick={() => setOpenComments(!openComments)}>
					{openComments ? "Hide Comments" : `Show ${comments.length} Comments`}
				</button>
			</div>
			{openComments && (
				<div className="commentWindow">
					{comments.map((c, index) => {
						return <Comment key={c._id} c={c} index={index} />;
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
