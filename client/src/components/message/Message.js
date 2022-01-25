import React from "react";
import "./message.css";
import { ObjectId } from "mongodb";
import TimeAgo from "timeago-react";

const Message = ({ message, own }) => {
	// console.log(ObjectId(message._id.toString()));
	// console.log(message._id.getTimestamp());
	// const obj = message._id.getTimestamp();
	const time = ObjectId(message._id).getTimestamp();
	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img src="" alt="" className="messageImg" />
				<p className="messageText">{message.text}</p>
			</div>
			<TimeAgo datetime={time} className="messageBottom" />
		</div>
	);
};

export default Message;
