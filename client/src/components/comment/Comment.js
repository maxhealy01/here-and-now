import React from "react";
import TimeAgo from "timeago-react";
import { ObjectId } from "mongodb";
import "./Comment.css";

const Comment = ({ c, index }) => {
	const { text, username } = c;
	// const time = ObjectId(c._id).getTimestamp();

	// Add alternate shading for easy comment visibility
	const shade = index % 2 === 0;
	const commentClass = `commentBody ${shade ? "shaded" : ""}`;
	return (
		<div className={commentClass}>
			<div className="commentTop">
				<div className="commentUsername">{username}</div>
				{/* <TimeAgo datetime={time} /> */}
			</div>
			<div className="commentText">{text}</div>
		</div>
	);
};

export default Comment;

// ))}
