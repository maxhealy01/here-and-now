import React from "react";
import TimeAgo from "timeago-react";
import { ObjectId } from "mongodb";

const Comment = ({ c, index }) => {
	const { text, username } = c;
	const time = ObjectId(c._id).getTimestamp();

	console.log(time);

	return (
		<div className="commentBody">
			<div className="commentTop">
				<div className="commentUsername">{username}</div>
				<TimeAgo datetime={time} />
			</div>
			<div className="commentText">{text}</div>
		</div>
	);
};

export default Comment;

// ))}
