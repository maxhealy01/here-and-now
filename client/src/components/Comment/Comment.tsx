import React from "react";
import TimeAgo from "timeago-react";
import "./Comment.css";

import { CommentType } from "../../utils/types";

interface CommentProps {
	comment: CommentType;
	index: number;
}
const Comment: React.FC<CommentProps> = ({ comment, index }) => {
	const { text, username, createdAt } = comment;
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
