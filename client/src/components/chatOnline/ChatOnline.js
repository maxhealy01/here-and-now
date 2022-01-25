import React from "react";
import "./chatOnline.css";

const ChatOnline = () => {
	return (
		<div className="chatOnline">
			<div className="chatOnlineFriend">
				<div className="chatOnlineImgContainer">
					<img src="" alt="" className="chatOnlineImg" />
					<div className="chatOnlineBadge"></div>
				</div>
				<span className="chatOnlineName">Joe</span>
			</div>
		</div>
	);
};

export default ChatOnline;
