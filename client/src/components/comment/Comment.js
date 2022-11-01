import React from "react";
import TimeAgo from "timeago-react";
import "./Comment.css";

const Comment = ({ c, index }) => {
	console.log(c);
	const { text, username, createdAt } = c;
	const time = createdAt;

	// Add alternate shading for easy comment visibility
	const shade = index % 2 === 0;
	const commentClass = `commentBody ${shade ? "shaded" : ""}`;
	return (
		<div className={commentClass}>
			<div className="commentTop">
				<div className="commentUsername">{username}</div>
				<TimeAgo datetime={time} />
			</div>
			<div className="commentText">{text}</div>
		</div>
	);
};

export default Comment;
