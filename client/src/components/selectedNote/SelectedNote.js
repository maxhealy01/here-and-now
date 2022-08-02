import React, { useState, useEffect } from "react";
import "./selectednote.css";
import { ObjectId } from "mongodb";
import TimeAgo from "timeago-react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_COMMENT, SEND_MESSAGE, NEW_CONVO } from "../../utils/mutations";
import { MY_CONVOS } from "../../utils/queries";

const SelectedNote = (selectedNote) => {
	const note = selectedNote.selectedNote;
	const time = ObjectId(note._id).getTimestamp();

	// Set logic for displaying either the Comment or Message input depending on the button clicked
	const [openWindow, setOpenWindow] = useState("");

	// Create logic for messaging the user
	const [newMessage, setNewMessage] = useState("");
	const [sendMessage] = useMutation(SEND_MESSAGE);
	const [newConvo] = useMutation(NEW_CONVO);
	const [conversations, setConversations] = useState("");
	const [userId, setId] = useState("");
	const { loading, data } = useQuery(MY_CONVOS);

	useEffect(() => {
		const getConversations = () => {
			setConversations(data.myConversations.conversations);
			setId(data.myConversations.username);
		};
		data && getConversations();
	}, [loading, data]);

	const handleMessageSubmit = (e) => {
		e.preventDefault();
	};

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
				<button onClick={() => setOpenWindow("message")}>Message</button>
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
						placeholder="Write something..."
						onChange={(e) => setComment(e.target.value)}
						value={comment}
					/>
					<button className="commentSubmitButton" onClick={handleCommentSubmit}>
						Post
					</button>
				</div>
			)}
			{openWindow === "message" && (
				<div className="messageWindow">
					<textarea
						className="messageInput"
						placeholder="Write a message..."
						onChange={(e) => setNewMessage(e.target.value)}
						value={newMessage}
					/>
					<button className="messageSubmitButton" onClick={handleMessageSubmit}>
						Send
					</button>
				</div>
			)}
		</div>
	);
};

export default SelectedNote;
