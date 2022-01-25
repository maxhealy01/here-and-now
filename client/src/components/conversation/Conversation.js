import React, { useEffect, useState } from "react";
import "./conversation.css";

const Conversation = ({ conversation, userId }) => {
	const [user, setUser] = useState(null);
	const username = conversation.members.find(
		(m) => m.username !== userId
	).username;

	return (
		<div className="conversation">
			<img src="" alt="" className="conversationImg" />
			<span className="conversationName">{username}</span>
		</div>
	);
};

export default Conversation;
